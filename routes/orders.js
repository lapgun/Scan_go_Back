var express = require("express");
var router = express.Router();
var db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
router.get("/", function(req, res) {
    let search = req.query.search;
    let currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : 6;
    let order_status = req.query.order_status;
    db.Orders.findAndCountAll({
        order: [
            ["id", "DESC"]
        ],
        where: {
            id: {
                [Op.substring]: search
            },
            order_status: {
                [Op.substring]: order_status
            }
        },
        include: 'customer',
        limit: perPage,
        include: "user",
        offset: (currentPage - 1) * perPage
    }).then(results => {
        let total = results.count;
        let data = results.rows;
        let totalPage = Math.ceil(total / perPage);
        res.send({
            data,
            pagination: {
                total,
                perPage,
                currentPage,
                totalPage
            }
        });
    });
});


//get by day 

router.get("/get/by-day/", function(req, res) {
        let date = req.query.date
        db.Orders.findAndCountAll({
            where: {
                createdAt: {
                    [Op.substring]: date
                }
            },
            include: "user",
            order: [
                ["createdAt", "ASC"]
            ]
        }).then(result => {
            res.send({ data: result })
        })
    })
    //get many order by id
router.get("/customerId/:id", function(req, res) {
    let customerId = req.params.id ? req.params.id : undefined;
    db.Orders.findAndCountAll({
        where: {
            customerId: customerId
        },
        include: ["order_products", "user"]
    }).then(result => {
        if (!result) {
            res.status(500).message("Orders not exist!");
        } else res.send(result);
    });
});

//get once order by id
router.get("/:id", function(req, res) {
    db.Orders.findByPk(req.params.id, {
        include: ["order_products", "user"]
    }).then(result => {
        return res.send(result);
    });
});

router.post("/", async function(req, res) {
    let cart = req.body.cart;
    let total = req.body.total;
    let user_id = req.body.user_id;
    if (!cart || !total || !user_id) {
        return res.status(400).message("Yeu cau dang nhap");
    }
    let t;
    try {
        t = await sequelize.transaction();
        await db.Orders.create({
            customerId: user_id,
            order_status: 0,
            total_price: total
        }, { transaction: t }).then(async function(result) {
            for (let i in cart) {
                await db.Order_product.create({
                    orderId: result.id,
                    productId: cart[i].id,
                    quantity: cart[i].quantity,
                    order_price: cart[i].price
                }, { transaction: t });
            }
        });
        return await t.commit();
    } catch (err) {
        await t.rollback();
    }
});
router.put("/:id", function(req, res) {
    let order_id = req.body.id;
    let order = req.body;
    db.Orders.update(order, {
        where: {
            id: order_id
        }
    }).then(result => {
        res.send(result);
    });
});
router.put("/confirm/:id", function(req, res) {
    let order_id = req.params.id ? req.params.id : undefined;
    db.Orders.update({ order_status: 1 }, {
        where: {
            id: order_id
        }
    }).then(result => {
        res.send({ data: result });
    });
});
router.put("/cancel/:id", function(req, res) {
    let order_id = req.params.id ? req.params.id : undefined;
    db.Orders.update({ order_status: 2 }, {
        where: {
            id: order_id
        }
    }).then(result => {
        res.send({ data: result });
    });
});
router.delete("/:id", function(req, res) {
    let order_id = req.params.id;
    if (!order_id) {
        return res
            .status(400)
            .send({ error: true, message: "Please provide order_id" });
    }
    db.Orders.destroy({
        where: {
            id: order_id
        }
    }).then(result => {
        console.log("Done");
        return res.send({
            error: false,
            data: result,
            message: "Order has been updated successfully."
        });
    });
});
module.exports = router;
var express = require("express");
var router = express.Router();
var db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
router.get("/", function (req, res) {
    let search = req.query.search;
    let currentPage = req.query.page ? parseInt(req.query.page) : 1;
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : 6;
    db.Orders.findAndCountAll({
        where: {
            id: {
                [Op.substring]: "%" + search + "%"
            }
        },
        limit: perPage,
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

router.get("/:id", function (req, res) {
    db.Orders.findByPk(req.params.id, {
        include: 'order_products',
        // include : 'order_statuses',
        // include : 'order_detail'
    }).then(result => {
        return res.send(result);
    });
});

router.post("/", async function (req, res) {
    let cart = req.body.cart ? req.body.cart : undefined;
    let total = req.body.total ? req.body.total : 0;
    total = total + total * 10 / 100;
    let user_id = req.body.user_id ? req.body.user_id : 0;
    let t;
    try {
        t = await sequelize.transaction();
        await db.Orders.create({
            customerId: user_id,
            order_status: false,
            total_price: total
        }, {transaction: t}).then(result => {
            for (let i = 0; i < cart.length; i++) {
                db.Order_product.create({
                    orderId: result.id,
                    productId: cart[i].id,
                    quantity: cart[i].order_time,
                    order_price: cart[i].price
                }, {transaction: t});
            }
        });
        await t.commit();
    } catch (err) {
        throw err;
    }
});
router.put("/:id", function (req, res) {
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

router.delete("/:id", function (req, res) {
    let order_id = req.params.id;

    if (!order_id) {
        return res
            .status(400)
            .send({error: true, message: "Please provide order_id"});
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
            message: "user has been updated successfully."
        });
    });
});

module.exports = router;

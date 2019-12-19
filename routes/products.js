var express = require("express");
var router = express.Router();
var db = require("../models");
var multer = require("multer");
const Op = db.Sequelize.Op;

router.get("/", function (req, res, next) {
    db.Products.findAndCountAll({
        include: ["categories", "images"]
    }).then(results => {
        let data = results.rows;
        res.send({ data: data });
    });
});
//Get all
router.post("/sort", function (req, res, next) {
    let currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : 5;
    db.Products.findAndCountAll({
        limit: perPage,
        offset: (currentPage - 1) * perPage,
        include: ["images", "categories"],
        order: [req.body]
    }).then(results => {
        let data = results.rows;
        let total = results.count;
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


//search
router.get("/search", function (req, res, next) {
    db.Products.findAndCountAll({
        where: {
            name: {
                [Op.substring]: req.query.search
            }
        },
        include: "images"
    }).then(results => {
        let data = results.rows;
        res.send({ data });
    });
});
// get orderby id
router.get("/newest", function (req, res, next) {
    db.Products.findAndCountAll({
        order: [
            ["id", "DESC"]
        ],
        limit: 6,
        include: "images"
    }).then(results => {
        let data = results.rows;
        res.send({ data });
    });
});

//limit 3
router.get("/new-products", function (req, res, next) {
    db.Products.findAndCountAll({
        order: [
            ["id", "DESC"]
        ],
        limit: 3,
        include: "images"
    }).then(results => {
        let data = results.rows;
        res.send({ data });
    });
});

// get orderby order_time
router.get("/order_time", function (req, res, next) {
    db.Products.findAndCountAll({
        order: [
            ["order_time", "DESC"]
        ],
        limit: 6,
        include: "images"
    }).then(results => {
        let data = results.rows;
        res.send({ data });
    });
});

router.get("/menu/:id", function (req, res, next) {
    let id = req.params.id;
    db.Products.findAndCountAll({
        where: {
            categoriesId: id
        },
        include: ["images", "categories"]
    }).then(results => {
        let data = results.rows;
        console.log('aaa', results.rows)
        res.send({ data });

    });
});

// Get by id
router.get("/:id", function (req, res, next) {
    db.Products.findByPk(req.params.id, {
        include: ["images", "categories", "comments"]
    }).then(results => res.send({ data: results }));
});

// Get by id
router.get("/comment/:id", function (req, res, next) {
    db.Products.findByPk(req.params.id, {
        include: "comments",
        limit: 5
    }).then(results => res.send({ data: results }));
});

// Post
router.post("/", function (req, res) {
    let form = req.body;
    if (!form.name || !form.categoriesId || !form.picture || !form.price || !form.description || !form.detail) {
        return res.send({ error: true, message: "Create failed" });
    }
    db.Products.create(form).then(result => {
        res.send({ error: false, data: result, message: "Create success" });
    });
});

//Update
router.put("/:id", function (req, res, next) {
    let form = req.body;
    db.Products.update(form, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.send({ data: result, message: "Update success" });
    });
});

//Update order_time 
router.put("/update/order_time/:id", function (req, res, next) {
    let form = req.body;
    db.Products.findByPk(req.params.id).then(result => {
        let order_time = parseInt(result.dataValues.order_time) + parseInt(form.quantity)
        db.Products.update({
            quantity: 1,
            order_time: order_time
        }, {
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.send({ data: data, message: "update order time" })
        })
    })
})

//Delete
router.delete("/:id", function (req, res, next) {
    db.Products.findByPk(req.params.id).then(r => {
        let picture_id = r.dataValues.picture
        db.Products.destroy({ where: { id: req.params.id } }).then(result => {
            db.product_image.destroy({ where: { id: picture_id } }).then(picture => {
                res.send({ message: "Delete picture" })
            })
            res.send({ message: "Delete success" })
        });
    })

});
module.exports = router;
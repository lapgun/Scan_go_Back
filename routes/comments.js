var express = require("express");
var router = express.Router();
var db = require("../models");
const Op = db.Sequelize.Op;

// get by products Id
router.post("/get/", function(req, res) {
    let currentPage = req.body.currentPage ? parseInt(req.body.currentPage) : 1;
    let perPage = req.body.perPage ? parseInt(req.body.perPage) : 3;
    db.Comment.findAndCountAll({
        where: {
            productId: req.body.productId
        },
        order: [
            ["id", "DESC"]
        ],
        limit: perPage,
        offset: (currentPage - 1) * perPage
    }).then(result => {
        let total = result.count;
        let data = result.rows;
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

router.get("/", function(req, res) {
    let currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : 6;
    db.Comment.findAndCountAll({
        order: [
            ["id", "DESC"]
        ],
        include: ["user", "product"],
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

// get search

router.get('/search', function(req, res) {
        let search = req.query.search;
        db.Comment.findAndCountAll({
            where: {
                name: {
                    [Op.substring]: search,
                }
            }

        }).then(results => {
            let data = results.rows
            return res.send({ data: data })
        })
    })
    // get all by product Id
router.get("/get/by_product_id/:id", function(req, res) {
    db.Comment.findAndCountAll({
        where: {
            productId: req.params.id
        }
    }).then(result => {
        res.send(result)
    })
})

//get by comment id
router.get("/:id", function(req, res) {
    db.Comment.findByPk(req.params.id).then(result => {
        return res.send(result);
    });
});

//Post
router.post("/", function(req, res) {
    let comment = req.body;
    db.Comment.create(comment).then(result => {
        return res.send(result);
    });
});
//post pagination

//Update
router.put("/:id", function(req, res) {
    let comment_id = req.body.id;
    let comment = req.body;
    db.Comment.update(comment, {
        where: {
            id: comment_id
        }
    }).then(result => {
        res.send(result);
    });
});

//Delete
router.delete("/:id", function(req, res) {
    let comment_id = req.params.id;

    if (!comment_id) {
        return res
            .status(400)
            .send({ error: true, message: "Please provide comment_id" });
    }
    db.Comment.destroy({
        where: {
            id: comment_id
        }
    }).then(result => {
        console.log("Done");
        return res.send({
            error: false,
            data: result,
            message: "User has been updated successfully."
        });
    });
});

module.exports = router;
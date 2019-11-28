var express = require("express");
var router = express.Router();
var db = require("../models");
var passwordHash = require("password-hash");
var jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;
// Get all
router.get("/", function(req, res) {
    let decoded = req.decoded;
    let currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : 2;

    db.User.findAndCountAll().then(results => {
        let total = results.count;
        let data = results.rows;
        let totalPage = Math.ceil(total / perPage);
        res.send({
            data,
            decoded,
            pagination: {
                total,
                perPage,
                currentPage,
                totalPage
            }
        });
    });
});

//Get by Id
router.get("/:id", function(req, res) {
    let user_id = req.params.id;
    let decoded = req.decoded;
    if (!user_id) {
        return res
            .status(400)
            .send({ error: true, message: "please provide user" });
    }
    if (decoded) {
        db.User.findByPk(user_id).then(result => {
            return res.send({ error: false, data: result, message: "user" });
        });
    }
});

router.post("/", function(req, res) {
    let user = req.body;
    user.password = passwordHash.generate(user.password);
    if (!user) {
        return res
            .status(400)
            .send({ error: true, message: "Please provide blog" });
    }
    db.User.create(user).then(result => {
        return res.send({ error: false, data: result, message: "users list." });
    });
});

//Update
router.put("/:id", function(req, res) {
    let user_id = req.body.id;
    let user = req.body;
    user.password = passwordHash.generate(user.password);
    if (!user_id || !user) {
        return res
            .status(400)
            .send({ error: user, message: "Please provide user and blog_id" });
    }
    db.User.update(user, {
        where: {
            id: user_id
        }
    }).then(result => {
        return res.send({ error: false, data: result, message: "users list." });
    });
});

//delete
router.delete("/:id", function(req, res, next) {
    let user_id = req.decoded.user_id;
    db.User.findByPk(req.params.id).then(
        result => {
            console.log(result.dataValues.id);
            console.log(user_id);
            if (result.dataValues.id == user_id) {
                db.User.destroy({ where: { id: req.params.id } }).then(
                    result => {
                        return res.send({ error: false, message: "delete success" })
                    }
                )
            } else {
                return res.send({ error: true, message: "Not allow" })
            }
        }
    )
});

module.exports = router;
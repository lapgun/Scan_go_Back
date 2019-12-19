var express = require("express");
var router = express.Router();
var db = require("../models");
var passwordHash = require("password-hash");
var jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;

// get search

router.get("/search", function(req, res) {
    let search = req.query.search;

    db.User.findAndCountAll({
        where: {
            name: {
                [Op.substring]: search
            }
        }
    }).then(results => {
        let data = results.rows;
        return res.send({ data: data })
    })
})

//get decoded
router.get("/decoded/", function(req, res) {
    let decoded = req.decoded;
    if (decoded) {
        return res.send({ error: false, decoded });
    } else {
        return res.send({ error: true, message: "there is no token" });
    }
});

// Get all
router.get("/:role", function(req, res) {
    let decoded = req.decoded;
    let currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : 2;
    db.User.findAndCountAll({
        order: [
            ["id", "DESC"]
        ],
        where: {
            role: req.params.role
        }
    }).then(results => {
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
router.get("/detail/:id", function(req, res) {
    let user_id = req.params.id;
    let decoded = req.decoded;
    if (!user_id) {
        return res
            .status(400)
            .send({ error: true, message: "please provide user" });
    }
    if (decoded) {
        db.User.findByPk(user_id).then(result => {
            return res.send({ error: false, data: result, decoded, message: "user" });
        });
    }
});

//Submit admin
router.put("/admin/:id", function(req, res) {
    if (req.decoded.user_role != 2) {
        return res.send({ error: true, message: "You are not allowed" });
    }
    if (req.body.role == 0) {
        db.User.update({
            role: 1
        }, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.send({ error: false, data: result, message: "Submit admin success" });
        });
    }
    if (req.body.role == 1) {
        db.User.update({
            role: 0
        }, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.send({ error: false, data: result, message: "Submit admin success" });
        });
    }
});

//Update
router.put("/:id", function(req, res) {
    let user_id = req.body.id;
    let user = req.body;
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
        return res.send({ error: false, data: result, message: "Users list." });
    });
});
//change password
router.put("/changePassword/:id", function(req, res) {
    let user_id = req.body.id;
    req.body.newPassword = passwordHash.generate(req.body.newPassword);
    db.User.findByPk(user_id).then(result => {
        if (result) {
            if (passwordHash.verify(req.body.oldPassword, result.password)) {
                db.User.update({ password: req.body.newPassword }, {
                    where: {
                        id: result.id
                    }
                }).then(results => {
                    return res.send({
                        success: true,
                        data: results,
                        msg: "cập nhật thành công"
                    });
                });
            } else
                return res.send({
                    success: false,
                    msg: "nhập sai pass word"
                });
        } else
            return res.send({
                success: false,
                msg: "không tồn tại khách hàng"
            });
    });
});
//delete
router.delete("/:id", function(req, res, next) {
    let user_id = req.decoded.user_id;
    let role = req.decoded.user_role;
    if (role == 2) {
        db.User.destroy({ where: { id: req.params.id } }).then(result => {
            return res.send({
                data: result,
                error: false,
                message: "Delete success"
            });
        });
    }

    if (role == 1) {
        db.User.findByPk(req.params.id).then(result => {
            if (result.dataValues.id == user_id || result.dataValues.role == 0) {
                db.User.destroy({ where: { id: req.params.id } }).then(result => {
                    return res.send({ error: false, message: "Delete success" });
                });
            } else {
                return res.send({ error: true, message: "You are not allowed" });
            }
        });
    }

    if (role == 0) {
        return res.send({ error: true, message: "You are not allowed" });
    }
});
module.exports = router;
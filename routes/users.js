var express = require("express");
var router = express.Router();
var db = require('../models');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
router.get('/', function (req, res) {
    let search = req.query.search;
    let currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : 2;
    let where = {};
    if (search) {
        where = {
            name: {
                [Op.substring]: '%' + search + '%'
            }
        }
    }
    db.User.findAndCountAll({
        where: where,
        limit: perPage,
        offset: (currentPage - 1) * perPage
    }).then(results => {
        let count = results.count;
        let data = results.rows;
        let total_page = Math.ceil(count / perPage);
        res.send({
            data: data,
            pagination: {
                total: count,
                totalPage: total_page,
                perPage: perPage,
                currentPage: currentPage
            }
        })
    })
});
router.get('/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({error: true, message: 'please provide user'})
    }
    db.User.findByPk(user_id).then(result => {
        return res.send({error: false, data: result, message: 'user'});
    });
});
router.post('/', function (req, res) {
    let user = req.body;
    user.password = passwordHash.generate(user.password);
    if (!user) {
        return res.status(400).send({error: true, message: 'Please provide blog'});
    }
    db.User.create(user)
        .then(result => {
        return res.send({error: false, data: result, message: 'users list.'});
    });
});
router.put('/edit', function (req, res) {
    let user = req.body;
    let user_id = req.body.id;
    user.password = passwordHash.generate(user.password);
    if (!user) {
        return res.status(400).send({error: user, message: 'Please provide user and blog_id'});
    }
    db.User.update(user, {
        where: {
            id : user_id
        }
    }).then(result => {
        return res.send({error: false, data: result, message: 'users list.'});
    });
});
router.post('/login', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(400).send({error: true, message: 'please provide blog_id'})
    }
    db.User.findOne(
        {
            where: {
                email: email
            }
        }
    ).then(result => {
        if (result) {
            let token = jwt.sign({user_id: result.id}, 'shhhhh');
            return res.send({check: passwordHash.verify(password, result.password), data: result, token: token})
        }
        return res.send({error: false, message: ' email or password error'})
    });
});
module.exports = router;

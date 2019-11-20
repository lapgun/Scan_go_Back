var express = require("express");
var router = express.Router();
var db = require("../models");
var multer = require('multer');
const Op = db.Sequelize.Op;
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'C:/Users/User/Scan_go/Frontend/Scan-Go-FrontEnd/static')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
});

var upload = multer({ storage: storage });

router.get("/", function(req, res, next) {
    db.Products.findAll({
        include: "images",
        // include: "category",
    }).then(results => res.send({ data: results }));
});

// Get by id
router.get("/:id", function(req, res, next) {
    db.Products.findByPk(req.params.id, {
            include: "images",
            // include: "category",
        })
        .then(results => res.send({ data: results }));
});

//get by cat_parent
router.post("/by_cat", function(req, res, next) {
    let menu = req.body;
    console.log('hellosdưdefefef',menu)
    // db.Products.findAndCountAll({
    //     where: {
    //         categoriesId: {
    //             [Op.or]: {

    //             }
    //         }
    //     }
    // }).then()
});

// get by category
router.get('/menu/:id', function(req, res, next) {
        let id = req.params.id
        db.Products.findAndCountAll({
            where: {
                categoriesId: id
            },
            include: 'images'
        }).then(results => {
            let data = results.rows
            res.send({ data })
        })
    })
    // Post
router.post("/", function(req, res) {
    let form = req.body;
    if (!form) {
        res.send("form exits");
    }
    db.Products.create(form).then(result => {
        res.send({ data: result, msg: "thanh cong" })
    });
});
//Update

router.put("/:id", function(req, res, next) {
    let form = req.body;
    db.Products.update(form, {
        where: {
            id: req.params.id
        }
    }).then(res.send({ message: "update success" }));
});

//Delete
router.delete("/:id", function(req, res, next) {
    db.Products.destroy({ where: { id: req.params.id } }).then(
        res.send({ message: "delete success" })
    );
});
module.exports = router;
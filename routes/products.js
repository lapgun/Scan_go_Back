var express = require("express");
var router = express.Router();
var db = require("../models");
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/lapgun/Desktop/scan_go/frontend/Scan-Go-FrontEnd/static')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
});

var upload = multer({storage: storage});

/* GET Products listing. */

router.get("/", function (req, res, next) {
    db.Products.findAll().then(results => res.send({data: results}));
});

// Get by id
router.get("/:id", function (req, res, next) {
    db.Products.findByPk(req.params.id ,
).then(results =>
        res.send({data: results})
    );
});

// Post
router.post("/", function (req, res) {
    let form = req.body;
    if (!form){
        res.send("form exits");
    }
    db.Products.create(form).then(result =>{
        res.send({data : result , msg : "thanh cong"})
    });
});
//Update

router.put("/:id", function (req, res, next) {
    let form = req.body;
    db.Products.update(form, {
        where: {
            id: req.params.id
        }
    }).then(res.send({message: "update success"}));
});

//Delete
router.delete("/:id", function (req, res, next) {
    db.Products.destroy({where: {id: req.params.id}}).then(
        res.send({message: "delete success"})
    );
});
module.exports = router;

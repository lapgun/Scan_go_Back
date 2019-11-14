var express = require("express");
var router = express.Router();
var db = require("../models");
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
router.post("/create", function (req, res) {
    let form = req.body;
    // console.log(form);
    if (!form){
        res.status(403).send("form exits");
    }
    db.Products.create(form).then(res.send("them thanh cong"));
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

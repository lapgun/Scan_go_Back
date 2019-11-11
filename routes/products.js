var express = require("express");
var router = express.Router();
var db = require("../models");
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Scan-go/client/client/static')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

var upload = multer({storage: storage});

/* GET Products listing. */
router.get("/", function (req, res, next) {
    db.Products.findAll().then(results => res.send({data: results}));
});

// Get by id
router.get("/:id", function (req, res, next) {
    db.Products.findByPk(req.params.id).then(results =>
        res.send({data: results})
    );
});

// Post
router.post("/create", upload.single('picture'), function (req, res, next) {
    let form = req.body;
    form.picture = req.file.filename;
    db.Products.create(form).then(res.send({message: "create success"}));
    // // res.send(req.body);
    //  console.log(req.body);
    //  console.log(req.file);
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

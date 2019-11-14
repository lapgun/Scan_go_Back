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
});
var upload = multer({storage: storage});
router.post("/upload", upload.array('files', 12), function (req, res, next) {
    let form = [];
    for (let i = 0; i < req.files.length; i++) {
        form.push({
                name: req.files[i].filename,
            }
        );
    }
    db.Gallery.bulkCreate(form).then( result => {
        res.send({ data : result, msg : "oke"})
    });
});
router.get("/",function (req,res) {
    db.Gallery.findAll()
        .then(result =>{
            res.send({data : result, msg : "list img"});
        });
});
module.exports = router;
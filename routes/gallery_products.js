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
router.post("/upload", upload.array('files', 12), function (req, res, next) {
    let form = [];
    for (let i = 0; i < req.files.length; i++) {
        form.push({
                nameImg: req.files[i].filename,
                local: req.files[i].path
            }
        );
    }
    db.gallery_products.bulkCreate(form).then(result =>{
        res.send({data : result , msg : "oke"});
    });
});
module.exports = router;
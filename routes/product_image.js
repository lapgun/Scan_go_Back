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
    if (req.files.length) {
        const columnPrefixName = 'image_'
        const dataInsert = {}

        //prepare data to insert
        dataInsert.default_image = req.files[0].filename

        req.files.forEach((file, index) => {
            dataInsert[columnPrefixName + '' + parseInt(index + 1)] = file.filename
        });

        // Insert to db
        db.product_image.bulkCreate([dataInsert])
        .then( result => {
            res.send({ data : result[0], msg : "success"})
        });
    }
});
router.get("/",function (req,res) {
    db.product_image.findByPk(req.params.id)
        .then(result =>{
            res.send({data : result, msg : "list img"});
        });
});
module.exports = router;
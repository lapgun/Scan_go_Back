var express = require("express");
var router = express.Router();
var db = require("../models");
var multer = require("multer");
const Op = db.Sequelize.Op;
var upload = multer({ storage: storage });
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "C:/scan-and-go/Scan-Go-FrontEnd/static/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

//Get all
router.get("/", function(req, res, next) {
  let search = req.query.search;
  let currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
  let perPage = req.query.perPage ? parseInt(req.query.perPage) : 5;

  db.Products.findAndCountAll({
    where: {
      name: {
        [Op.substring]: "%" + search + "%"
      }
    },
    limit: perPage,
    offset: (currentPage - 1) * perPage,
    include : "images"
  }).then(results => {
    let total = results.count;
    let data = results.rows;
    let totalPage = Math.ceil(total / perPage);
    res.send({
      data,
      pagination: {
        total,
        perPage,
        currentPage,
        totalPage
      }
    });
  });
});

//search
router.get("/search",function(req,res,next){
  let search = req.query.search;
  db.Products.findAndCountAll({
    where:{
      name :{
        [Op.substring]: "%" + search + "%"
      }
    },
    include:"images"
  }).then(results =>{
    let data = results.rows
    res.send({data})
  });
})


// Get by id
router.get("/:id", function(req, res, next) {
  db.Products.findByPk(req.params.id, {
    include: "images"
  }).then(results => res.send({ data: results }));
});

// Post
router.post("/", function(req, res) {
  let form = req.body;
  if (!form) {
    res.send("form exits");
  }
  db.Products.create(form).then(result => {
    res.send({ data: result, msg: "thanh cong" });
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

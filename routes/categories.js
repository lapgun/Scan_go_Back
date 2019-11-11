var express = require("express");
var router = express.Router();
var db = require("../models");
const Op = db.Sequelize.Op;
/* GET categories listing. */
router.get("/", function(req, res, next) {
  db.Categories.findAll().then(results => res.send({ data: results }));
});
// Get categories parent
router.get("/cat_parent",function(req,res,next){
  db.Categories.findAndCountAll({
    where:{
      cat_parent : 0
    }
  }).then(results => res.send({data:results}))
});

// Get cat products
router.get("/cat_product",function(req,res,next){
  db.Categories.findAndCountAll({
    where:{
      cat_parent : {
        [Op.ne]: 0
      }
    }
  }).then(results => res.send({data:results}))
});
// Get by id
router.get("/:id", function(req, res, next) {
  db.Categories.findByPk(req.params.id).then(results =>
    res.send({ data: results })
  );
});

// Post
router.post("/", function(req, res, next) {
  let form = req.body;
  db.Categories.create(form).then(res.send({ message: "create success" }));
});

//Update
router.put("/:id", function(req, res, next) {
  let form = req.body;

  db.Categories.update(form, {
    where: {
      id: req.params.id
    }
  }).then(res.send({ message: "update success" }));
});

//Delete
router.delete("/:id", function(req, res, next) {
  let id = req.params.id;
  db.Categories.destroy({ where: { id: id } }).then(
    res.send({ message: "delete success" })
  );
});
module.exports = router;

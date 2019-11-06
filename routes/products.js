var express = require("express");
var router = express.Router();
var db = require("../models");

/* GET Products listing. */
router.get("/", function(req, res, next) {
  db.Products.findAll().then(results => res.send({ data: results }));
});

// Get by id
router.get("/:id", function(req, res, next) {
  db.Products.findByPk(req.params.id).then(results => res.send({ data: results }));
});

// Post
router.post("/", function(req, res, next) {
  let form = req.body;
  db.Products.create(form).then(res.send({ message: "create success" }));
});

//Update

router.put("/", function(req, res, next) {
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

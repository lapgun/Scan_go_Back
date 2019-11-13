var express = require("express");
var router = express.Router();
var db = require("../models");
const Op = db.Sequelize.Op;
router.get("/", function(req, res) {
  let search = req.query.search;
  let currentPage = req.query.page ? parseInt(req.query.page) : 1;
  let perPage = req.query.perPage ? parseInt(req.query.perPage) : 6;
  db.Orders.findAndCountAll({
    where: {
      id: {
        [Op.substring]: "%" + search + "%"
      }
    },
    limit: perPage,
    offset: (currentPage - 1) * perPage
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

router.get("/:id", function(req, res) {
  db.Orders.findByPk(req.params.id,{
    include : 'order_products'
  }).then(result => {
    return res.send(result);
  });
});

router.post("/", function(req, res) {
  let order = req.body;

  db.Orders.create(order).then(result => {
    return res.send(result);
  });
});

router.put("/:id", function(req, res) {
  let order_id = req.body.id;
  let order = req.body;
  db.Orders.update(order, {
    where: {
      id: order_id
    }
  }).then(result => {
    res.send(result);
  });
});

router.delete("/:id", function(req, res) {
  let order_id = req.params.id;

  if (!order_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide order_id" });
  }
  db.Orders.destroy({
    where: {
      id: order_id
    }
  }).then(result => {
    console.log("Done");
    return res.send({
      error: false,
      data: result,
      message: "user has been updated successfully."
    });
  });
});

module.exports = router;

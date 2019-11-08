var express = require("express");
var router = express.Router();
var db = require('../models');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
router.get("/", function (req, res) {
  let search = req.query.search;
  let decoded=req.decoded;
  let currentPage = req.query.page ? parseInt(req.query.page) : 1;
  let perPage = req.query.perPage ? parseInt(req.query.perPage) : 6;
  db.Admin.findAndCountAll({
    where: {
      name: {
        [Op.substring]: "%" + search + "%"
      }
    },
    limit: perPage,
    offset: (currentPage - 1) * perPage
  }).then(results => {
    let total = results.count;
    let data = results.rows;
    let totalPage = Math.ceil(total / perPage);
    console.log(decoded);
    res.send({
      data,
      decoded,
      pagination: {
        total,
        perPage,
        currentPage,
        totalPage
      }
    });
  });
});

router.get("/:id", function (req, res) {
  db.Admin.findByPk(req.params.id).then(result => {
    return res.send(result);
  });
});

router.post("/", function (req, res) {
  let admin = req.body;
  admin.password = passwordHash.generate(admin.password);
  db.Admin.create(admin).then(result => {
    return res.send(result);
  });
});

router.put("/:id", function (req, res) {
  let admin_id = req.body.id;
  let admin = req.body;
  db.Admin.update(admin, {
    where: {
      id: admin_id
    }
  }).then(result => {
    res.send(result);
  });
});

router.delete("/:id", function (req, res) {
  let admin_id = req.params.id;

  if (!admin_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide order_detail_id" });
  }
  db.Admin.destroy({
    where: {
      id: admin_id
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

//login
router.post('/login', function (req, res) {
  let email = req.body.email;
  db.Admin.findOne({
    where: {
      email: email
    }
  }).then(result => {

    if (result) {
      if (passwordHash.verify(req.body.password, result.password)) {
        let token = jwt.sign({ admin_id: result.id }, 'qtahhnmsv');
        return res.send({ data: result, token: token });
      }
    }
    return res.send({ error: false, data: result, message: 'No email.' });
  })
});

module.exports = router;

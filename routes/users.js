var express = require("express");
var router = express.Router();
var db = require("../models");
var passwordHash = require("password-hash");
var jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;

// Get all
router.get("/", function(req, res) {
  let decoded = req.decoded;
  let currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
  let perPage = req.query.perPage ? parseInt(req.query.perPage) : 2;

    db.User.findAndCountAll(
    //   {
    //   where: {
    //     name: {
    //       [Op.substring]: "%" + search + "%"
    //     },
    //         
    //   },
    //   limit: perPage,
    //   offset: (currentPage - 1) * perPage
    // }
    ).then(results => {
      let total = results.count;
      let data = results.rows;
      let totalPage = Math.ceil(total / perPage);
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

//Get by Id
router.get("/:id", function(req, res) {
  let user_id = req.params.id;
  let decoded = req.decoded;
  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: "please provide user" });
  }
  if(decoded){
    db.User.findByPk(user_id).then(result => {
      return res.send({ error: false, data: result, message: "user" });
    });
  }
});

router.post("/", function(req, res) {
  let user = req.body;
  user.password = passwordHash.generate(user.password);
  if (!user) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide blog" });
  }
  db.User.create(user).then(result => {
    return res.send({ error: false, data: result, message: "users list." });
  });
});

//Update
router.put("/:id", function(req, res) {
  let user_id = req.body.id;
  let user = req.body;
  user.password = passwordHash.generate(user.password);
  if (!user_id || !user) {
    return res
      .status(400)
      .send({ error: user, message: "Please provide user and blog_id" });
  }
  db.User.update(user, {
    where: {
      id: user_id
    }
  }).then(result => {
    return res.send({ error: false, data: result, message: "users list." });
  });
});

router.delete("/:id", function(req, res, next) {
  let id = req.params.id;
  db.User.destroy({ where: { id: id } }).then(
    res.send({ message: "delete success" })
  );
});

// // Login
// router.post('/login', function(req,res){

//   let email = req.body.email;
//   db.User.findOne({
//     where : {
//       email : email
//     }
//   }).then(result => {
      
//     if(result) {
//       if(passwordHash.verify(req.body.password, result.password)) {
//         let token = jwt.sign({ user_id: result.id }, 'qtahhnmsv');
//         return res.send({data:result, token:token});
//       }
//     }
//       return res.send({ error: false, data: result, message: 'No email.' });
//   })
// });
module.exports = router;

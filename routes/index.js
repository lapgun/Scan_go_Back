var express = require("express");
var router = express.Router();
var db = require("../models");
var passwordHash = require("password-hash");
var jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
//login

router.post('/login', function (req, res) {

  let email = req.body.email;
  db.User.findOne({
    where: {
      email: email
    }
  }).then(result => {
      if (result) {
      if (passwordHash.verify(req.body.password, result.password)) {
        let token = jwt.sign({ user_id: result.id,user_name:result.name }, 'qtahhnmsv');
        return res.send({ data: result, token: token });
      }else{
        return res.send({ error: false, data: result, message: 'Wrong password' });
      }
    }else{
      return res.send({ error: false, data: result, message: 'Wrong email' });
    }
  })
});

//register

router.post("/register", function(req, res) {
  let user = req.body;
  user.password = passwordHash.generate(user.password);
  if (!user) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide blog" });
  }
  db.User.findOne({
    where: {
      email: user.email
    }
  }).then(exist => {
    if (exist) {
      return res.send({
        error: true,
        message: " Email existed, please try another one"
      });
    } else {
      db.User.create(user).then(result => {
        return res.send({
          error: false,
          data: result,
          message: "Registion success"
        });
      });
    }
  });
});
module.exports = router;

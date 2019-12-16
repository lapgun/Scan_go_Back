var express = require("express");
var router = express.Router();
var db = require("../models");
var passportfb = require("passport-facebook").Strategy;
var passport = require("passport");
var session = require('express-session');
var app = express();
app.use(session(
    {
        secret: 'sadasda',
        resave: true,
        saveUninitialized: true
    }
));
app.use(passport.initialize());
app.use(passport.session());
router.get('/', (req, res) => {
    console.log("ádsds");
});
router.get('/auth/fb', passport.authenticate('facebook', {scope: "email"}));

router.get('/auth/fb/cb', passport.authenticate('facebook', {successRedirect: { msg: "thành công" }, failureRedirect: { msg : "lỗi" }}),function (req,res) {
        if(req.user){
            return res.redirect(303, '/#!/fb/');
        } else {
            return res.status(400).json({message:"Not found"});
        }
});

router.use('/auth/logout', (req, res) => {
    res.send("oke");
});
passport.use(new passportfb({
        clientID: "463998524443230",
        clientSecret: "a2a178ef7f4d59987c8ded37811e4ef2",
        callbackURL: "http://localhost:4000/auth/fb/cb",
        profileFields: ['id', 'displayName', 'photos', 'email'],
        enableProof: true
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    }
));
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
module.exports = router;
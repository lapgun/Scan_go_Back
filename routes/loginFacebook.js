var express = require("express");
var router = express.Router();
var db = require("../models");
var passport = require("passport");
var session = require('express-session');
var passportfb = require("passport-facebook").Strategy;
var app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(session(
    {
        secret: 'sadasda',
        resave: true,
        saveUninitialized: true
    }
));
passport.use(new passportfb({
        clientID: "373882913288063",
        clientSecret: "2766e871dd19193d2231285bdcceb433",
        callbackURL: "http://localhost:4000/auth/fb/cb",
        profileFields: ['email', 'gender', 'locale'],
        enableProof: true
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    }
));

router.get("/", function (req, res) {
    res.send("welcome to website");
});
router.get('/auth/fb', passport.authenticate('facebook', {scope: ['email']}));
router.get('/auth/fb/cb', passport.authenticate('facebook', {
    failureRedirect: '/', successRedirect: '/'
}));
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
module.exports = router;
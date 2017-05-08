var express = require("express");
var router = express.Router();
var User = require("../models/user");
var auth = require("../middleware/auth");

router.get('/login', function(req, res){
    res.render("login");
});

router.post('/login', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var user = new User(email, password);
    user = user.getUser();
    if (user === null) {
        res.send("User info wrong");
    } else {
        req.session.userID = user.id;
        res.send("You're logged in!");
    }
});

router.get('/profile', auth, function(req, res){
    res.send("User is authenticated");
});

module.exports = router;
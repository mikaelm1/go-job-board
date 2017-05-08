var express = require("express");
var router = express.Router();
var User = require("../models/user");
var auth = require("../middleware/auth");

router.get('/login', function(req, res){
    res.render("login", {expressFlash: req.flash('danger'), flashType: 'danger'});
});

router.post('/login', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var user = new User(email, password);
    user.getUser(email, function(u){
        if (u === null) {
            req.flash('danger', 'Invalid login credentials');
            res.redirect('/user/login');
        } else {
            res.redirect('/');
        }
    });
});

router.get('/profile', auth, function(req, res){
    res.send("User is authenticated");
});

module.exports = router;
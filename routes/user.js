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
    user.getUser(function(u){
        if (u === null) {
            req.flash('danger', 'Invalid login credentials');
            res.redirect('/user/login');
        } else {
            req.session.userID = u.id;
            req.flash('success', 'Welcome back!');
            res.redirect('/');
        }
    });
});

router.get('/register', function(req, res){
    res.render('register', {expressFlash: req.flash('danger'), flashType: 'danger'});
});

router.post('/register', function(req, res){
    var name = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var userType = req.body.userType;
    var user = new User(email, password);
    user.name = name;
    if (userType == 'Job Seeker') {
        user.userType = 'seeker';
    } else {
        user.userType = 'employer';
    }
    //name, email, password, type, callback
    user.createUser(function(err, u){
        if (err) {
            req.flash('danger', 'Error creating account: ' + err);
            res.redirect('/user/register');
        } else {
            req.session.userID = u.id;
            req.flash('success', 'Account created');
            res.redirect('/');
        }
    })
});

router.get('/logout', function(req, res){
    req.flash('success', 'You have successfully logged out');
    req.session.destroy();
    res.redirect('/');
});

router.get('/profile', auth, function(req, res){
    res.send("User is authenticated");
});

module.exports = router;
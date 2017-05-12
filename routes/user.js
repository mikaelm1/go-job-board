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
            // req.flash('danger', 'Invalid login credentials');
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Invalid login credentials'
            }
            res.redirect('/user/login');
        } else {
            req.session.userID = u.id;
            req.session.userType = u.userType;
            req.session.sessionFlash = {
                type: 'success',
                message: 'Welcome back!'
            }
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
            // req.flash('danger', 'Error creating account: ' + err);
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Error creating account'
            }
            res.redirect('/user/register');
        } else {
            req.session.userID = u.id;
            req.session.userType = u.userType;
            // req.flash('success', 'Account created');
            req.session.sessionFlash = {
                type: 'success',
                message: 'Account created!'
            }
            res.redirect('/');
        }
    })
});

router.get('/logout', function(req, res){
    // req.flash('success', 'You have successfully logged out');
    req.session.destroy();
    // req.session.sessionFlash = {
    //     type: 'success',
    //     message: 'You have successfully logged out'
    // }
    res.redirect('/');
});

router.get('/profile', auth.isLoggedIn, function(req, res){
    var user = new User('', '');
    user.id = req.session.userID;
    user.byIDWithEducation(function(err, data){
        if (err) {
            req.flash('danger', 'Error: ' + err);
            res.redirect('/');
        } else {
            // console.log('DATA:')
            // console.log(data);
            res.render('userprofile', {data: data});
        }
    })
});

module.exports = router;
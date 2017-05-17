var express = require("express");
var router = express.Router();
var Employer = require("../models/employer");
var auth = require("../middleware/auth");

router.get('/login', function(req, res){
    res.render("login");
});

router.post('/login', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var user = new Employer(email, password);    
    user.byEmail(function(err, u){
        if (err) {
            // req.flash('danger', 'Invalid login credentials');
            req.session.sessionFlash = {
                type: 'danger',
                message: err,
            }
            res.redirect('/employer/login');
        } else {
            req.session.userID = u.id;
            // req.session.userType = u.userType;
            req.session.userType = 'employer';
            req.session.sessionFlash = {
                type: 'success',
                message: 'Welcome back!'
            }
            res.redirect('/');
        }
    });
});

router.get('/register', function(req, res){
    res.render('register');
});

router.post('/register', function(req, res){
    var name = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var city = req.body.city;
    var state = req.body.state;
    var employer = new Employer(email, password);
    employer.name = name;
    employer.city = city;
    employer.state = state;
    employer.create(function(err, u){
        if (err) {
            // req.flash('danger', 'Error creating account: ' + err);
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Error creating account: ' + err,
            }
            res.redirect('/employer/register');
        } else {
            console.log(u.insertId);
            req.session.userID = u.insertId;
            req.session.userType = 'employer';
            // req.flash('success', 'Account created');
            req.session.sessionFlash = {
                type: 'success',
                message: 'Account created!'
            }
            res.redirect('/');
        }
    })
});

module.exports = router;
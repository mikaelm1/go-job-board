var express = require("express");
var router = express.Router();
var Education = require("../models/education");
var auth = require("../middleware/auth");

router.get('/', auth.isSeeker, function(req, res){
    // console.log('INSIDE education/');
    // res.locals.sessionFlash = {
    //     type: 'success',
    //     message: 'This is a flash message using custom middleware and express-session.'
    // }
    res.render('education/new');
});

router.post('/new', auth.isSeeker, function(req, res){
    var name = req.body.name;
    var major = req.body.major;
    var yearStarted = Number(req.body.yearStarted);
    var yearEnded = Number(req.body.yearEnded);
    var gpa = req.body.gpa;
    var education = new Education(name, major, yearStarted, yearEnded, gpa);
    education.create(req.session.userID, function(err, ed){
        if (err){
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Error: ' + err,
            }
            res.redirect('/education/');
        } else {
            req.session.sessionFlash = {
                type: 'success',
                message: 'Education added!',
            }
            res.redirect('/user/profile');
        }
    }); 
    // res.render('education/new');
});


module.exports = router;
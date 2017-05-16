var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var auth = require("../middleware/auth");

router.get('/new', auth.isSeeker, function(req, res){
    res.render('project/new');
});

router.post('/new', auth.isSeeker, function(req, res){
    var name = req.body.name;
    var notes = req.body.notes;
    var yearStarted = req.body.yearStarted;
    var yearEnded = req.body.yearEnded;
    if (yearEnded === 'Current') {
        yearEnded = -1;
    }
    var proj = new Project();
    proj.name = name;
    proj.notes = notes;
    proj.yearStarted = yearStarted;
    proj.yearEnded = yearEnded;
    proj.create(req.session.userID, function(err, p){
        if (err) {
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Error: ' + err,
            }
            res.redirect('/project/new');
        } else {
            req.session.sessionFlash = {
                type: 'success',
                message: 'Added project to your profile!',
            }
            res.redirect('/user/profile');
        }
    })
});

module.exports = router;
var express = require("express");
var router = express.Router();
var Job = require("../models/job");
var auth = require("../middleware/auth");

router.get('/', function(req, res){
    var j = new Job('', '');
    j.getAll(function(err, jobs){
        if (err) {
            res.locals.sessionFlash = {
                type: 'danger',
                message: err,
            }
        }
        res.send({'jobs': jobs}); 
    })
});

router.get('/new', auth.isEmployer, function(req, res){
    res.render('job/new');
});

router.post('/new', auth.isEmployer, function(req, res){
    var j = new Job(req.body.title, req.body.notes);
    j.create(req.userID, function(err, job){
        if (err) {
            req.session.sessionFlash = {
                type: 'danger',
                message: err,
            }
        } else {
            req.session.sessionFlash = {
                type: 'success',
                message: 'New job added!',
            }
        }
        res.redirect('/employer/profile');
    });
});

module.exports = router;
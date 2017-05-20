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
        res.render('job/index', {jobs: jobs}); 
    })
});

router.get('/new', auth.isEmployer, function(req, res){
    res.render('job/new');
});

router.post('/new', auth.isEmployer, function(req, res){
    var j = new Job(req.body.title, req.body.notes);
    j.create(req.session.userID, function(err, job){
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

router.post('/:id/apply', auth.isSeeker, function(req, res){
    var j = new Job('', '');
    j.id = req.params.id;
    j.apply(req.session.userID, function(err, job){
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'You have already applied to this job',
                }
            } else {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'Error: ' + err,
                }
            }
            // console.log(err.code);
        } else {
            req.session.sessionFlash = {
                type: 'success',
                message: 'Successfully applied to job!',
            }
        }
        res.redirect('/job');
    });
});

module.exports = router;
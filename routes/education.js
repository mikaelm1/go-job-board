var express = require("express");
var router = express.Router();
var User = require("../models/user");
var auth = require("../middleware/auth");

router.get('/', auth.isSeeker, function(req, res){
    // res.locals.expressFlash = req.flash('danger', 'Hey');
    // res.locals.flashType = 'danger';
    console.log('INSIDE education/');
    res.locals.sessionFlash = {
        type: 'success',
        message: 'This is a flash message using custom middleware and express-session.'
    }
    res.render('education/new');
});

router.post('/', auth.isSeeker, function(req, res){
    req.flash('danger', 'Still not finished');
    res.render('education/new');
});


module.exports = router;
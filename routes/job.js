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

module.exports = router;
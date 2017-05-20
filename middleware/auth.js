var isLoggedIn = function (req, res, next) {
    var isEmployer = false;
    if (req.session.userType === 'seeker') {
        isEmployer = false;
    } else {
        isEmployer = true;
    }
    if (req.session.userID) {
        res.locals.currentUser = req.session.userID;
        res.locals.isEmployer = isEmployer;
        return next();
    }
    console.log('AUTH failed');
    res.redirect("/user/login");
}

var isSeeker = function(req, res, next) {
    if (req.session.userID && req.session.userType === 'seeker') {
        res.locals.currentUser = req.session.userID;
        res.locals.isEmployer = false;
        return next();
    } else {
        console.log('AUTH for seeker failed');
        res.redirect('/user/login');
    }
}

var isEmployer = function(req, res, next) {
    if (req.session.userID && req.session.userType === 'employer') {
        res.locals.currentUser = req.session.userID;
        res.locals.isEmployer = true;
        return next();
    } else {
        console.log('AUTH for employer failed');
        res.redirect('/employer/login');
    }
}

module.exports = {
    isLoggedIn,
    isSeeker,
    isEmployer,
};
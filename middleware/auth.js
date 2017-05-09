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
    res.redirect("/user/login");
}

module.exports = isLoggedIn;
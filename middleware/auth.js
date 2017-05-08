var isLoggedIn = function (req, res, next) {
    if (req.session.userID) {
        return next();
    }
    res.redirect("/user/login");
}

module.exports = isLoggedIn;
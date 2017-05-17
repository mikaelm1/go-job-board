var handlebars = require("express-handlebars").create({defaultLayout: "main"});
var bodyParser = require("body-parser");
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var app = express();

var userRoutes = require('./routes/user');
var educationRoutes = require('./routes/education');
var projectRoutes = require('./routes/project');
var employerRoutes = require('./routes/employer');

app.set('port', 8000);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'SuperSecretPassword',
    cookie: {maxAge: 3600000},
}));
// app.use(flash());

app.use(function(req, res, next){
    // console.log('INSIDE CUSTOM FLASH MIDDLEWARE');
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});


app.get('/', function(req, res){
    // console.log(req.session);
    // res.locals.sessionFlash = {
    //     type: 'success',
    //     message: 'This is a flash message using custom middleware and express-session.'
    // }
    // console.log(res.locals);
    var isEmployer = false;
    if (req.session.userType === 'seeker') {
        isEmployer = false;
    } else {
        isEmployer = true;
    }
    res.render('home', {
        currentUser: req.session.userID,
        isEmployer: isEmployer,
    });
});

app.get('/health', function(req, res){
    res.type('application/json');
    res.send({
        "message": "App is healthy"
    });
});

app.use('/user', userRoutes);
app.use('/education', educationRoutes);
app.use('/project', projectRoutes);
app.use('/employer', employerRoutes);


app.listen(app.get('port'), function(){
    console.log("Server started on port " + app.get('port'));
    console.log("Press Ctrl-C to terminate");
});
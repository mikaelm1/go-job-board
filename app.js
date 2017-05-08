var handlebars = require("express-handlebars").create({defaultLayout: "main"});
var bodyParser = require("body-parser");
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var app = express();

var userRoutes = require('./routes/user');

app.set('port', 8000);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    cookie: { maxAge: 3600 },
    saveUninitialized: true,
    resave: 'true',
    secret: 'SuperSecretPassword'
}));
app.use(flash());


app.get('/', function(req, res){
    // req.flash('success', 'This is a flash message using the express-flash module.');
    // res.render('home', {expressFlash: req.flash('success'), flashType: 'success'});
    res.render('home');
});

app.get('/health', function(req, res){
    res.type('application/json');
    res.send({
        "message": "App is healthy"
    });
});

app.use('/user', userRoutes);


app.listen(app.get('port'), function(){
    console.log("Server started on port " + app.get('port'));
    console.log("Press Ctrl-C to terminate");
});
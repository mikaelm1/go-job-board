var pool = require('../db');

function User(email, password) {
    this.email = email;
    this.password = password;
}

User.prototype.getUser = function(callback) {
    pool.query('SELECT * FROM users WHERE email=(?) AND password=(?)', [this.email, this.password], function(err, result){
        if (err) {
            console.log("Error getting user!!!!");
            callback(null);
            return null;
        }
        // console.log("Inside getUser");
        // console.log(result);
        if (result.length === 0) {
            callback(null);
        } else {
            var user = {
                id: result[0].id,
                email: result[0].email,
                userType: result[0].user_type,
            }
            callback(user);
        }
    });
}

User.prototype.byID = function(callback) {
    pool.query('SELECT * FROM users WHERE id=(?)', this.id, function(err, result){
        if (err) {
            callback(err, null);
        } else {
            if (result.length === 0) {
                callback('User data not found', null);
            } else {
                // console.log(result);
                user = {
                    id: result[0].id,
                    email: result[0].email,
                    userType: result[0].user_type,
                    username: result[0].name,
                }
                callback(null, user);
            }
        }
    });
}

User.prototype.byIDWithEducation = function(callback) {
    // var sql = 'SELECT * FROM users u INNER JOIN '+
    // 'education ed ON ed.user_id = u.id '+
    // 'WHERE u.id=?';
    var sql = 'SELECT * FROM education WHERE user_id=?'
    var options = {sql: sql, nestTables: true}
    pool.query(options, this.id, function(err, result, fields){
        if (err) {
            console.log('Error: ' + err);
            callback(err, null);
        } else {
            // console.log(result);
            // console.log(result.length);
            var data = [];
            for (var i=0; i<result.length; i++) {
                data[i] = {
                    id: result[i].education.id,
                    name: result[i].education.name,
                    major: result[i].education.major,
                    yearStarted: result[i].education.year_started,
                    yearEnded: result[i].education.year_graduated,
                    gpa: result[i].education.gpa,
                }
            }
            // console.log(data);
            callback(null, data);
        }
    });
}

User.prototype.createUser = function(callback) {
    // console.log("THIS EMAIL: " + this.userType);
    pool.query('INSERT INTO users SET ?', {name: this.name, email: this.email, password: this.password, user_type: this.userType}, function(err, u){
        if (err){
            console.log("Error creating user: " + err);
            callback(err, null);
            return null;
        }
        callback(null, 'Success');
    });
    // pool.query({
    //     sql: 'INSERT INTO users SET ?',
    //     timeout: 40000, // 40s
    //     values: [{name: name, email: email, password: password, user_type: type}]
    //     // values: [this.email, name, this.password, type] 
    // }, function(err, user){
    //     if (err){
    //         console.log("Error creating user: " + err);
    //         callback(err, null);
    //         return null;
    //     }
    //     callback(null, 'Success');
    // })
}

module.exports = User;
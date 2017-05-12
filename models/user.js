var mysql = require('mysql');
// var pool = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'mysql.eecs.oregonstate.edu',
//   user            : 'cs340_mukhsikm',
//   password        : '1786',
//   database        : 'cs290_mukhsikm'
// });
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'job_board'
});

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
    var sql = 'SELECT * FROM users u INNER JOIN '+
    'education ed ON ed.user_id = u.id '+
    'WHERE u.id=?';
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
                    uName: result[i].u.name,
                    uEmail: result[i].u.email,
                    edName: result[i].ed.name,
                    edMajor: result[i].ed.major,
                    edYearStarted: result[i].ed.year_started,
                    edYearEnded: result[i].ed.year_graduated,
                    edGPA: result[i].ed.gpa,
                }
            }
            // console.log(fields);
            callback(null, data);
        }
    });
    // pool.query({
    //     sql: sql,
    //     nestTables: '_',
    //     timeout: 50000,
    //     values: [this.id]
    // }, function(err, result, fields){
    //     if (err) {
    //         console.log(result);
    //         console.log('Error: ' + err);
    //         callback(err, null);
    //     } else {
    //         console.log('Result: ' + result);
    //         console.log('Fields: ' + fields);
    //         callback(null, fields);
    //     }
    // });
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
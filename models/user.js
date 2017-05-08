var mysql = require('mysql');
// var pool = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'mysql.eecs.oregonstate.edu',
//   user            : 'cs290_mukhsikm',
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
            user = {
                id: result[0].id,
                email: result[0].email,
            }
            callback(user);
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
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

User.prototype.projects = function(callback) {
    var sql = 'SELECT * FROM projects WHERE user_id=?';
    pool.query(sql, this.id, function(err, results){
        if (err) {
            callback(err, null);
        } else {
            // console.log(results);
            var data = [];
            for (var i=0; i<results.length; i++) {
                data[i] = {
                    id: results[i].id,
                    name: results[i].title,
                    notes: results[i].notes,
                    yearStarted: results[i].start_year,
                    yearEnded: results[i].end_year,
                }
                if (data[i].yearEnded === -1) {
                    data[i].yearEnded = 'Current';
                }
            }   
            callback(null, data);
        }
    });
}

User.prototype.applications = function(callback) {
    var sql = 'SELECT j.id, j.title, j.notes, j.e_id FROM jobs j ' + 
    'INNER JOIN jobs_users js ON js.jid = j.id WHERE js.uid=?';
    pool.query(sql, this.id, function(err, results){
        if (err) {
            callback(err, null);
        } else {
            // console.log(results);
            var data = [];
            for (var i=0; i<results.length; i++) {
                data[i] = {
                    id: results[i].id,
                    title: results[i].title,
                    notes: results[i].notes,
                    eid: results[i].e_id,
                }
            }
            callback(null, data);
        }
    })
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
    pool.query('INSERT INTO users SET ?', {name: this.name, email: this.email, password: this.password}, function(err, u){
        if (err){
            console.log("Error creating user: " + err);
            callback(err, null);
            return null;
        }
        // console.log(u);
        callback(null, u);
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
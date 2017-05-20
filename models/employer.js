var pool = require('../db');

function Employer(email, password) {
    this.email = email;
    this.password = password;
}

Employer.prototype.byEmail = function(callback) {
    var sql = 'SELECT * FROM employers WHERE email=?';
    pool.query(sql, this.email, function(err, e){
        if (err) {
            callback('Error: ' + err, null);
        } else {
            // console.log(e);
            if (e.length === 0) {
                callback('Invalid credentials.', null)
            } else {
                var employer = {
                    id: e[0].id,
                    email: e[0].email,
                    name: e[0].name,
                    city: e[0].city,
                    state: e[0].state,
                }
                callback(null, employer);
            }
        }
    });
}

Employer.prototype.byID = function(callback) {
    var sql = 'SELECT * FROM employers WHERE id=?';
    pool.query(sql, this.id, function(err, e){
        if (err) {
            callback(err);
        } else {
            if (e.length === 0) {
                callback('Invalid credentials.', null)
            } else {
                var employer = {
                    id: e[0].id,
                    email: e[0].email,
                    name: e[0].name,
                    city: e[0].city,
                    state: e[0].state,
                }
                callback(null, employer);
            }
        }
    });
}

Employer.prototype.create = function(callback) {
    var sql = 'INSERT INTO employers (email, name, password, city, state) VALUES (?, ?, ?, ?, ?)';
    pool.query({
        sql: sql,
        values: [this.email, this.name, this.password, this.city, this.state]
    }, function(err, results){
        if (err) {
            callback(err, null);
        } else {
            console.log(results);
            callback(null, results);
        }
    });
}

module.exports = Employer;
var pool = require('../db');

function Employer(email, password) {
    this.email = email;
    this.password = password;
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
var pool = require('../db');

function Project() {
}

Project.prototype.create = function(uid, callback) {
    var sql = 'INSERT INTO projects (user_id, title, notes, start_year, end_year) VALUES (?, ?, ?, ?, ?)';
    pool.query({
        sql: sql,
        values: [uid, this.name, this.notes, this.yearStarted, this.yearEnded]
    }, function(err, result){
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            console.log(result);
            callback(null, result);
        }
    });
}

module.exports = Project;
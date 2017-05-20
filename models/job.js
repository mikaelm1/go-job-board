var pool = require('../db');

function Job(title, notes) {
    this.title = title;
    this.notes = notes;
}

Job.prototype.create = function(eid, callback) {
    var sql = 'INSERT INTO jobs (title, notes, e_id) VALUES (?, ?, ?)';
    pool.query(sql, [this.title, this.notes, eid], function(err, results){
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

Job.prototype.apply = function(uid, callback) {
    var sql = 'INSERT INTO jobs_users (uid, jid) VALUES (?, ?)';
    pool.query(sql, [uid, this.id], function(err, result){
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

Job.prototype.getAll = function(callback) {
    var sql = 'SELECT * FROM jobs';
    pool.query(sql, function(err, results){
        if (err) {
            callback(err, null);
        } else {
            // console.log(results);
            if (results.length === 0) {
                callback(null, []);
            } else {
                var jobs = [];
                for (var i=0; i<results.length; i++) {
                    jobs[i] = {
                        id: results[i].id,  
                        title: results[i].title,
                        notes: results[i].notes,
                    }
                }
                callback(null, jobs);
            }
        }
    });
}

module.exports = Job;
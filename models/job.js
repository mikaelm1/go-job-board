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

// employer removes job
// Job.prototype.remove = function()

// applicant withdraws applicant
Job.prototype.withdraw = function(uid, callback) {
    var sql = 'DELETE FROM jobs_users WHERE uid=? AND jid=?';
    pool.query(sql, [uid, this.id], function(err, result){
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

Job.prototype.byTitle = function(filter, callback) {
    var sql = "SELECT * FROM jobs WHERE title LIKE ?";
    pool.query(sql, '%'+filter+'%', function(err, results){
        if (err) {
            callback(err, null);
        } else {
            // console.log(results);
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

Job.prototype.allApplicants = function(callback) {
    var sql = 'SELECT u.id, u.name, u.email FROM users u ' +
    'INNER JOIN jobs_users js ON js.uid = u.id WHERE js.jid=?';
    pool.query(sql, this.id, function(err, r){
        if (err) {
            callback(err, null) 
        } else {
            var users = [];
            for (var i=0; i<r.length; i++) {
                users[i] = {
                    id: r[i].id,  
                    name: r[i].name,
                    email: r[i].email,
                }
            }
            callback(null, users);
        }
    });
}

module.exports = Job;
var pool = require('../db');

function Education(name, major, yearStarted, yearEnded, gpa) {
    this.name = name;
    this.major = major;
    this.yearStarted = yearStarted;
    this.yearEnded = yearEnded;
    this.gpa = gpa;
}


Education.prototype.create = function(uid, callback){
    console.log('UID: ' + uid);
    console.log(this.name, this.major, this.gpa, this.yearStarted, this.yearEnded);
    pool.query({
        sql: 'INSERT INTO education (name, major, year_started, year_graduated, gpa, user_id)  VALUES (?, ?, ?, ?, ?, ?)',
        timeout: 40000,
        values: [this.name, this.major, this.yearStarted, this.yearEnded, this.gpa, uid]
    }, function(err, result){
        if (err) {
            console.log('Error: ' + err);
            callback(err, null);
        } else {
            // console.log(result);
            // ed = {
            //     id: result[0].id,
            //     name: result[0].name,
            //     major: result[0].major,
            //     yearStarted: result[0].year_started,
            //     yearEnded: result[0].year_graduated,
            //     gpa: result[0].gpa,
            //     uid: result[0].uid,
            // }
            callback(null, 'success');
        }
    });
}

module.exports = Education;
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

function User(name, major) {
    this.name = name;
    this.major = major;
}
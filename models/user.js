var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'cs290_mukhsikm',
  password        : '1786',
  database        : 'cs290_mukhsikm'
});

function User(email, password) {
    this.email = email;
    this.password = password;
}

User.prototype.getUser = function(identity) {
    pool.query('SELECT * FROM users WHERE email=(?)', identity, function(err, result){
        if (err) {
            console.log("Error getting user");
            return null;
        }
        user = {
            id: result[0].id,
            email: result[0].email,
        }
        return uer;
    })
}

module.exports = User;
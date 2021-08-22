const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'angadi'
});

connection.connect(function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Database Connection Successful");
    }
});
module.exports = connection;
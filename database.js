 var mysql = require('mysql');
 var connection = mysql.createConnection({
    //socketPath     : '/cloudsql/enhanced-watch-254613:us-central1:sql-db',
    host: '35.226.17.181',
    database: 'db-project-db',
    user: 'root',
    password: 'Humaraprojectbesthai'
 });

 module.exports  = connection;

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root' ,
    database: 'project2'
});

connection.connect(function(err){
    if(err) {
        console.log('Error de conexión: ' + err.stack);
        return
    }
    console.log('Conexión correcta '+ connection.threadId);
});

module.exports = connection;
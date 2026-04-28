const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oliveira%Santo@',
    database: 'curso_node'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL via MVC!');
});

module.exports = connection;

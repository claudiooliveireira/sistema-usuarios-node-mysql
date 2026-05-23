const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'suaSenha',
    database: 'nomeDoDatabse'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL via MVC!');
});

module.exports = connection;

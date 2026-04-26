//1- Conexão com o MySQL (Arquivo de conexão)

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oliveira%Santo@',
    database: 'curso_node'
});

// Exportando a conexão para usar no servidor
module.exports = connection;





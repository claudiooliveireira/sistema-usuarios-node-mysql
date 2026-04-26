const mysql = require('mysql2');

// 1- Configuração das credenciais de acesso
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oliveira%Santo@'
    //não foi passado o 'database' ainda porque vou cria-lo agora
});

connection.connect((err) => {
    if (err) throw err;
    console.log('----- Conectando ao MySQL! -----');

    // 2- Criando o banco de dados ( Database )
    //ps: O comando 'CREATE DATABASE IF NOT EXISTS' evita erros se o banco já existir
    connection.query('CREATE DATABASE IF NOT EXISTS curso_node', (err) => { // connetion.query função principal, ( SQL comandos do banco) vai tudo dentro das aspas dele)
        if (err) throw err;
        console.log('1. Banco de dados garantido!');

        // 3 - Dizemos ao MySQL que queremos usar esse banco específico
        connection.query('USE curso_node', (err) => {
            if (err) throw err;

            // 4 - Criando a tabela de usuários ( Create)
            // INT = Inteiro, VARCHAR = Texto, PRYMARY KEY = Identificador único
            const sqlTabela = `
            CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL
            )`;

            connection.query(sqlTabela, (err) => {
                if (err) throw err;
                console.log('2. Tabela "usuarios" pronta!');

                // 5- Inserindo um dados de teste
                // é usado o '?' para evitar ataques SQL Injection (segurança)
                const sqlInsert = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
                const dados = ['TesteParaFront', 'testeParaFrontnd@gmai.com']; // dados que vão ser inseridos 

                connection.query(sqlInsert, dados, (err, result) => {
                    if (err) throw err; 
                    console.log('3. Usuário inserido! ID do registro:', result.insertId);

                    // 6 - Buscando o que acabei de salvar para conferir
                    connection.query('SELECT * FROM usuarios', (err, rows) => {
                        if (err) throw err;
                        console.table(rows); // console.table mostra os dados formatados como tabela!

                        // 7- Fechando a conexão para não deixar o processo "pendurado"
                        connection.end();
                        console.log('--- Processo finalizado com sucesso! ---');
                    });
                });
            });


        });


    });


});
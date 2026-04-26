const mysql = require("mysql2"); // Importando o mysql

// Configuração da conexão
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oliveira%Santo@',
    port: 3306
})

// Executa a conexão
connection.connect((err) => {
    if(err) {
    console.error(" Erro ao conectar ao MySQL", err,message);
    return
}
console.log("Conexão estabilicida! O node já consegue falar com o MySQL")

    // comando simples para testar
    connection.query('SELECT "Banco funcionando!" AS Resultado', (err, rows) => {
        if (err) throw err;
        console.log('Teste de Query;', rows[0].Resultado);

        // Fecha a conexão após o teste
        connection.end();
    })


})

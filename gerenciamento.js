const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oliveira%Santo@',
    database: 'curso_node'
});

// Função para ATUALIZAR ( Update )
function atualizarEmail(id, novoEmail) {
    // SET  define qual colunar mudar | WHERE diz QUAL linha deve ser mudada
    const sql = 'UPDATE usuarios SET email = ? WHERE id = ?';

    connection.query(sql, [novoEmail, id], (err, result) => {
        if (err) throw err;
        console.log(`Registro ${id} email atualizado com sucesso!`);
    });
}


// Função para DELETA ( Delete )
function deletarUsuario(id) {
    // MUITO CUIDADE: Sempre devo usar o WHERE no DELETE, senão apaga a tebela inteira!
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    
    connection.query(sql, [id], (err, result) => {
        if (err) throw err;
        console.log(`Usuário ${id} removido`)
    });
}
/*
// extra
// Função para atualizar nome
function atualizarNome(id, novoNome) {
    const sql = 'UPDATE usuarios SET nome = ? WHERE id = ?';

    connection.query(sql, [novoNome, id], (err, result) => {
        if (err) throw err;
        console.log(`Registro ${id}, nome atualizado com sucesso!`)
    })
}
/*/
// Extra atualizar nome e e-mail na mesma Função
// Função atualizar tudo
function AtualizarTudo(id, novoNome, novoEmail) {
    const sql = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ? ';
    

    connection.query(sql, [novoNome, novoEmail, id], (err, result) => {
       if(err) throw err;
        console.log(`Registro ${id} totalmente atualizado!`)
    });

    
    

}
/*
// Testando
//1. Atualizando o e-mail, nesse caso o ID 5
atualizarEmail(5, 'vinicius.atualizado@gmail.com');

//2. Deletando o ID 2 ( que tá repetido )
deletarUsuario(2);
deletarUsuario(4);


// atualizar nome e email 
atualizarNome(8, 'Nathan'); // nome
atualizarEmail(8,'email.atualizado@gmail.com') // e-mail
*/
//Atualizar tudo
AtualizarTudo(6, 'Gabriela', 'atualizadotambem@gmail.com')

// atualizando tudo para teste no Frontend
AtualizarTudo(11, 'AtualizadoParaFront', 'AtualizadoTesteParaFrontend@gmail.com')


//3. Ver o resultado final
setTimeout(() => {
    connection.query('SELECT * FROM usuarios', (err, rows) => {
        console.table(rows);
        connection.end();
    });
}, 1000);
//2- Servidor que cria as rotas ( URLs ), (Servidor web)
const express = require('express');
const db = require('./db'); // importando a conexão
const app = express();


app.use(express.json());// Isso é para o app.js entender JSON
app.use(express.static('public'));// Isso faz com que o Express entenda que tudo na pasta 'public' deve ser enviado ao navegar

// 2.Rota de usuários: Busca no MySQL e mostra no navegador
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';

    db.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).send('Erro no banco de dados');
        }

        // Enviar os dados como JSON 
        res.json(rows);

    });
});

// Rota para RECEBER os dados do formulário 
app.post('/usuarios', (req, res) => {
    console.log('Dados recebidos do forulário:', req.body);

    const {nome, email} = req.body; // Pegando os dados enviados
    const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';

    db.query(sql, [nome, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId, nome, email });
    });
});

// Rota para Excluir usuário do banco ( Delete )
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params.id;
    const sql = 'DELETE FROM usuarios WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar no MySQL:', err.message);
        } return res.status(500).send('Erro ao deletar no banco');
        res.status(200).send('Usuário excluido com sucesso!');
    })

} )


// Liga o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});




/* isso é do primeiro teste
// 1.Rota principal: Quando acessar http://localhost:3000/
app.get('/', (req, res) => {
    res.send('<h1>Bem-vindo ao meu Sistema Backend!</h1><p>Acesse /usuarios para ver a lista </p>');
});
*/





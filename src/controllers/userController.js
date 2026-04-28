const User = require('../models/userModel'); // importando o model

// Lista dos usuários
exports.listarUsuarios = (req, res) => {
    User.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
 
// atualizar usuários
exports.atualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    User.update(id, nome, email, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows > 0) {
            res.status(200).send('Atualizado com sucesso!');
        }else {
            res.status(404).send('Usuário não encontrado');
        }
    });
};

// Criar usuários
exports.criarUsuario = (req, res) => {
    const { nome, email } = req.body;
    User.create(nome, email, (err, result) => {
        if (err) return res.status(500).json({error: err.message });
        res.status(201).json({ id: result.insertId, nome, email });
    });
};

// Deletar usuário
exports.deletarUsuario = (req, res) => {
    const { id } = req.params;
    User.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).send('Usuário excluído!');
    });
};
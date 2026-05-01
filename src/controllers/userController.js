const User = require('../models/userModel'); // importando o model

// Lista dos usuários
exports.listarUsuarios = (req, res) => {
    User.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
 
// atualizar usuários Put
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

// Criar usuários Create, agora com Validação 
exports.criarUsuario = (req, res) => {
    // Pegando os dados e limpando os espaços inúteis com .trim()
    const nome = req.body.nome ? req.body.nome.trim() : "";
    const email = req.body.email ? req.body.email.trim() : "";
    const apenasLetras = /^[A-Za-zÀ-ÿ ]+$/; // Essa Regex diz: "Só aceite letras ( maiúscula, minúscula) e espaço"



    // VALIDAÇÃO: usando Expressões Regulares ( Regex ) A "Peneira" fina validação de Regex e Length
    if (!apenasLetras.test(nome) || nome.length < 3) {// Essa Regex diz: "Só aceite letras ( maiúscula, minúscula) e espaço", e se for maior que 3 caracteres
        return res.status(400).json({ message: "O nome deve conter apenas letras e ter pelo menos 3 caracteres!"})
    }

    // Se tiver '@' no email, continua a (validação básica)
    if (!email || !email.includes('@')){ // se não inclui @ no email
        return res.status(400).json({ message: "Insira um e-mail válido"})
    }

    // VALIDAÇÃO: Checar duplicidade
    User.findByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ message: "Erro ao verificar e-mail."});

        if (results.length > 0){
            // se achou alguém com esse e-mail, barrado aqui
            return res.status(400).json({ message: "Este e-mail já está cadastrado!"});
        }

        // Se não achou, o create é chamado 
        User.create(nome, email, (err, result) => {
            if (err){
                 return res.status(500).json({error: "Erro ao salvar"});
            }
            return res.status(201).json({message: "Usuário criado!", id: result.insertId });
        });

    });


    
};

// Deletar usuário Delete
exports.deletarUsuario = (req, res) => {
    const { id } = req.params;
    User.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).send('Usuário excluído!');
    });
};
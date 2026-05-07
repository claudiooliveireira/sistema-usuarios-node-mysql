const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');

exports.login = (req,res) => {

    const { email, senha } = req.body;

    //1- Buscar o admin pelo email
    Admin.findByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ message: "Erro no servidor." });

        if (results.length === 0 ) {
            return res.status(401).json({ message: "E-mail ou senha incorretos." });
        }

        const  admin = results[0];

        //2- Compara a senha digitada com o Hash do banco
        bcrypt.compare(senha, admin.senha, (err, matches) => {
            if (err) return res.status(500).json({ message: "Erro ao verificar senha."});

            if (!matches) {
                return res.status(401).json({ message: "Email ou senha incorretos." });
            }

            //3- Sucesso
            if (matches) {
                req.session.adminLogado = true; // aqui entrega a "pulseira" 
                req.session.adminNome = admin.nome;

                req.session.save((err) => {
                    if (err) return res.status(500).json({ message: "Erro ao salvar sessão" });
                    return res.status(200).json({
                    message: `Bem-vindo, ${admin.nome}!`,
                    redirect: '/gerenciamento'
                    });
                });

                

            }
        });
    });
};







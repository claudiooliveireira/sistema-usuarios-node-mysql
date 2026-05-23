const bcrypt = require('bcrypt');
const Admin = require('./src/models/adminModel');

const saltRounds = 10; // Nível de segurança da criptografia
const senhaPura = 'Exemplo123456'; // senha escolhida

bcrypt.hash(senhaPura, saltRounds, (err,hash) => {
    if (err) {
        console.error("Erro ao gerar hash: ", err);
        return
    }
    Admin.create('Claudio', 'admin@teste.com', hash, (err, result) => {
        if (err) {
            console.error('Erro no Banco de Dados:', err);
        } else {
            console.log('Admin criado com sucesso! O hash da sunha senha será: ', hash);
        }
        process.exit();
    });
});

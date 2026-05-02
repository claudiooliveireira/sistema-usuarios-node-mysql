const db = require('../config/db');

const Admin = {
    // Função para criar o admin 
    create: (nome, email, senhaHash, callback) => {
        const sql = 'INSERT INTO admins (nome, email, senha) VALUES (?, ?, ?)';

        db.query(sql, [nome, email, senhaHash], (err, result)=> { 
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    }
};


module.exports = Admin;

/*
findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM admins WHERE email = ?';
        db.query(sql, [email], callback);
    },
*/
const db = require('../config/db');

const User = {
    getAll: (callback) => {
        db.query('SELECT * FROM usuarios', callback);
    },
    create: (nome, email, callback) => {
        const sql ='INSERT INTO usuarios (nome, email) VALUES (?, ?)';
        db.query(sql,[nome, email], callback);

    },
    update: (id, nome, email, callback) => {
        const sql = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';
        db.query(sql, [nome, email, id], callback);
    },
    delete:(id, callback) => {
        const sql = 'DELETE FROM usuarios WHERE id = ?';
        db.query(sql, [id], callback);
    },
    findByEmail: (email, callback) => { // procurar um usuáro pelo email
        const sql = 'SELECT * FROM usuarios WHERE email = ?'
        db.query(sql, [email], callback);
    }

};

module.exports = User;
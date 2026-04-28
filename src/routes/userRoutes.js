const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

// Definindo os caminhos e ligando aos controllers
router.get('/usuarios', userController.listarUsuarios);
router.post('/usuarios', userController.criarUsuario);
router.put('/usuarios/:id', userController.atualizarUsuario);
router.delete('/usuarios/:id', userController.deletarUsuario);

module.exports = router;
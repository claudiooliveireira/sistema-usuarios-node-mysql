const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Rota que o formulário de login vai chamar 
router.post('/login', adminController.login);

module.exports = router;
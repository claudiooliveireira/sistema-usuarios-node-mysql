//2- Servidor que cria as rotas ( URLs ), (Servidor web)
const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');


app.use(express.json());// Isso é para o app.js entender JSON
app.use(express.static('public'));// Isso faz com que o Express entenda que tudo na pasta 'public' deve ser enviado ao navegar

// Usando as rotas criadas
app.use(userRoutes);


// Liga o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor MVC rodando em http://localhost:3000');
});


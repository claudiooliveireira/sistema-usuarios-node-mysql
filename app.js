//2- Servidor que cria as rotas ( URLs ), (Servidor web)
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const userRoutes = require('./src/routes/userRoutes');
const adminRoutes = require('./src/routes/adminRoutes')
const verificarAutenticacao = require('./src/middlewares/authMiddleware');



// Configuração global
app.use(express.json());// Isso é para o app.js entender JSON

// A sessão precisa está antes das rotas
app.use(session({ 
    secret: 'hello-world',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false} // em localhost é deixado false
}));



// Rotas Públicas ( Qualquer um pode ver)
app.use('/admin', adminRoutes); // As rotas de admin começam com /admin/login 

//Rotas Protegidas ( Só passa com "pulseiras ")
app.use(verificarAutenticacao);// Agora, só quem está logado chega no userRoutes. Tudo daqui para baixo exige login


app.use(express.static('public'));// Isso faz com que o Express entenda que tudo na pasta 'public' deve ser enviado ao navegar.Cuidado: arquivos aqui são entregues direto plo navegado

app.get('/gerenciamento', (req, res) => {
    const caminhoArquivo = path.join(process.cwd(), 'src', 'views', 'index.html');
     console.log("Tentando abrir o arquivo:", caminhoArquivo);
    res.sendFile(caminhoArquivo);
});

// "Bem-vindo Nome, Rota para enviar o nome do admin logado para o font-end
app.get('/admin-logado', (req, res) => {
    if (req.session.adminNome) {
        res.json({ nome: req.session.adminNome });
    }else {
        res.status(401).json({message : "Não logado"}); // Se não tiver nome na sessão, mando um erro (não autorizado)
    }
});



// Rota para logout ( Sair da conta)
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/gerenciamento'); // Se houver erro, redireciona de volta para a página de gerenciamento
        }
        res.clearCookie('connect.sid'); // Limpa o rastro do navegador
        res.redirect('/login.html'); // manda de volta para a página de login
    });
});




app.use(userRoutes);



// Liga o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor MVC rodando em http://localhost:3000');
});


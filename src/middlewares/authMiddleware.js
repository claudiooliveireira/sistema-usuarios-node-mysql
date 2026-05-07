// Segurança, chega a "pulseira" antes de deixar alguém ver a lista de usuários
module.exports = (req, res, next) => {
    console.log("Sessão atual", req.session);
    // Se estiver logado, passa direto.
    if (req.session.adminLogado) {
        console.log("Pulseira encontrada! pode passar.")
        // se tem a "pulseira" pode passar para a próxima função (next)
        return next();
    }

    // Lista Branca: Coisas que nunca devem ser barradas
    const caminhoPublico = ['/login.html', '/admin/login', '/loginScript.js', '/script.js', '/style.css'];

    if (caminhoPublico.includes(req.path)) {
        return next();
    }

    // Se não for publico e não estiver logado, manda para p login.
    res.redirect('/login.html');
};



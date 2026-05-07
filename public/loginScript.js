document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();


    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagemDiv = document.getElementById('mensagem');

    try {
        const response =await fetch('/admin/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, senha})
        });

        const data = await response.json();

        if (response.ok) {
            mensagemDiv.innerHTML = `<span class="text-sucess">${data.message} </span>`;
            // Redireciona para a página principal após 1.5 seg
            setTimeout (() => {
                window.location.href = '/gerenciamento';
            }, 1500);
        }else {
            mensagemDiv.innerHTML = `<span class="text-danger">${data.message}</span>`
            
        }
    }catch (error) {
        mensagemDiv.innerHTML = `<span class="text-danger">Erro ao conectar com o servidor</span>`
    }

});
// Requisição para a rota do express ( buscar dados )
// Espera a página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const corpo = document.getElementById('tabela-corpo');

    //Faz a requisição para a rota criada no Express
    fetch('/usuarios').then(res => res.json()).then(usuarios => {
        // Limpa o corpo da tabela antes de preeencher ( boa prática )
        corpo.innerHTML = '';

        // Percorre cada usuário e cria uma linha na tabela
        usuarios.forEach(user => {
            const linha = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                </tr>`;
            corpo.innerHTML += linha;
        });
    })
    .catch(err => console.error('Erro ao buscar usuários:', err));
})

// Logica para capturar o clique do botão e enviar para o servidor
const form = document.getElementById('form-cadastro'); 

// evento
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede que a página recarregue

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // Enviar os dados para o servidor
    fetch('/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ nome: nome, email: email })
    }).then(res => res.json()).then(novoUsuario => {
        console.log('Sucesso:', novoUsuario);
        form.reset(); // Limpa os campos
        location.reload(); // Recarrega a página para mostrar o novo usuário na tabela
    });
});







       
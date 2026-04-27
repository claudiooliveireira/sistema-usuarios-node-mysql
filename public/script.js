// Requisição para a rota do express ( buscar dados )
// Espera a página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const corpo = document.getElementById('tabela-corpo');

    //Faz a requisição para a rota criada no Express
    fetch('/usuarios').then(res => res.json()).then(usuarios => {
        // Limpa o corpo da tabela antes de preeencher ( boa prática )
        corpo.innerHTML = '';

        // Percorre cada usuário e cria uma linha na tabela ( Linha da tabela )
        usuarios.forEach(user => {
            const linha = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                    <td>
                    <button class="btn btn-primary btn-sm" onClick="editarUsuario(${user.id})">Editar</botton>
                    <button class="btn btn-danger btn-sm" onClick="excluirUsuario(${user.id})">Excluir</button> 
                    </td>
                </tr>`;
                    
            corpo.innerHTML += linha;
        });
        
    }).catch(err => console.error('Erro ao buscar usuários:', err));
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

// Função de Excluir usuário
function excluirUsuario(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')){
        fetch(`/usuarios/${id}`, {
            method: 'DELETE'
        }).then(() => {
           
            location.reload(); // Recarrega a lista atualizada
            
        }).catch(err => { 
            console.error('Erro na requisição:', err);
            alert('Erro ao conectar ao servidor')
        });
    }

}

// Função para editar usuário ( UPDATE ) (PUT)
function editarUsuario(id) {
    const novoNome = prompt("Digite o novo nome:");
    const novoEmail = prompt("Digite o novo e-mail:");

    if (novoNome && novoEmail) {
        fetch(`/usuarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: novoNome, email: novoEmail })
        }).then(res => {
            if (res.ok) {
                alert('Usuário atualizado com sucesso!');
                location.reload();
            } else {
                alert('Erro ao atualizar');
            }
        }).catch(err => console.error('Erro:', err));
    }


}





       
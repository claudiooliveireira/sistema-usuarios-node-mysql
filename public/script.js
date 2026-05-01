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
                    <button class="btn btn-primary btn-sm" onClick="editarUsuario(${user.id}, '${user.nome}', '${user.email}')">Editar</botton>
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
    }).then(async res => {
        // Se o status for 200 ou 201 (sucesso)
        if (res.ok) {
            alert('Cadastrado com sucesso!');
            location.reload();
        }else {
            // Se o status for 400(Erro de validação)
            const erro = await res.json();
            alert('Atenção: ' + erro.message); // Will show: "nome e email são obrigatório"
        }
    }).catch(err => {
        console.log('Erro na requisição', err);
    })});

    

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
/*
// Função para editar usuário ( UPDATE ) (PUT), esse método o usuário editava pelo prompt, agora vou colocar para editar numa janela no site com op modal do bootstrap
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
*/
// Novo Edita usuário
function editarUsuario(id, nome, email) {
    document.getElementById('editId').value = id;
    document.getElementById('editNome').value = nome;
    document.getElementById('editEmail').value = email;

    //comando do Bootstrap para abrir o modal via JS
    const meuModal = new bootstrap.Modal(document.getElementById('modalEditar'));
    meuModal.show();

    console.log(meuModal);

}

// Enviar os dados novos para o servidor, botão de salvar edição
function salvarEdicao(){
    const id = document.getElementById('editId').value;
    const nome = document.getElementById('editNome').value;
    const email = document.getElementById('editEmail').value;

    fetch(`/usuarios/${id}`, {
        method : 'PUT',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({nome, email})
    }).then(res => {
        if (res.ok) {
            alert('Usuário atualizado com sucesso!');
            location.reload(); // Recarrega para mostrar a mudança
        }
    })



}




       
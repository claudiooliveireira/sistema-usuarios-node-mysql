Sistema de Gerenciamento de Usuários (Full Stack)

Este é um projeto de estudo desenvolvido para praticar a integração entre um banco de dados relacional e um servidor web moderno.

 Tecnologias Utilizadas
* **Backend:** Node.js com Framework Express.
* **Banco de Dados:** MySQL (utilizando o driver `mysql2`).
* **Frontend:** HTML5, JavaScript Assíncrono (Fetch API) e Bootstrap 5 para o design.
* **Versionamento:** Git e GitHub.
* **Autenticação e Sessão:** express-session para gerenciamento de login.
* Segurança:** bcrypt.

 Funcionalidades
- [x] Listagem de usuários em tempo real direto do banco.
- [x] Cadastro de novos usuários via formulário web.
- [x] Atualização de dados (Nome e E-mail) via código.
- [x] Interface responsiva e moderna.
- [x] Sistema de Autenticação Completo: Login e Logout de administradores.
- [x] Proteção de Rotas: Middlewares que restringem o acesso a áreas sensíveis.
- [x] Sessões Persistentes: Reconhecimento do usuário logado em diferentes páginas.
- [x] Saudação Personalizada: Interface que identifica o administrador logado.



Como rodar o projeto
1. Clone o repositório: `git clone https://github.com/claudiooliveira/sistema-usuarios-node-mysql.git`
2. Instale as dependências: `npm install`
3. Configure sua conexão no arquivo `db.js`.
4. Inicie o servidor: `node app.js`
5. Acesse `http://localhost:3000` no seu navegador.

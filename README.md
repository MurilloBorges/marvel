# marvel
Expor um serviço onde eu possa encontrar todas as informações sobre as comics e characters da marvel;

O serviço conterá funções de autenticação, gerenciamentos de usuários e de comics/characters favoritos;



# Requisitos
> Eu, como usuário, desejo me cadastrar na aplicação e efetuar login/logout;

> Eu, como usuário, desejo editar minhas informações;

> Eu, como usuário, desejo ver a listagem e detalhes das comics, podendo favoritar ou desfavoritar;

> Eu, como usuário, desejo ver a listagem e detalhes dos characters, podendo favoritar ou desfavoritar;

> Eu, como usuário, desejo ver a listagem e detalhes dos characters e comics favoritos.


# Navegação
> Deve existir uma página de cadastro de usuário para a aplicação;

> Ao cadastrar o usuário será possível realizar o login;

> Ao logar na aplicação deverá ser possível realizar a alterações dos dados do usuário. ex: login, senha, etc...;

> Ao logar na aplicação deverá ser possível realizar a busca de characters e comics da marvel e os favoritos do usuário;

> Buscando por Comics: ao encontrar uma comic desejada deve ser possível favoritar e visualizar as informações da mesma e a exibição dos characteres presentes nela, sendo possível selecionar um character e visualizar as informações do mesmo;

> Buscando por Characteres: ao encontrar um character desejado deve ser possível favoritar e visualizar as informações do mesmo e a exibição das comics onde ele participa, sendo possível selecionar uma comic e visualizar as informações da mesma;

> Exibindo favoritos: deve existir páginas que exibe as comics favoritas e os characters favoritos do usuário, podendo exibir as informações dos mesmos.



# Tecnologias utilizadas
- Para o backend foi utilizado a ferramenta NodeJS;

- Para o banco de dados onde será armazenado os usuários da aplicação foi utilizado o MongoDB;

- Para o frontend foi utilizado a ferramenta ReactJS;

- Para os testes automaizados foi utilizado o framework cypress;

- Para documentação da API, foi utilizado o swagger;

- Para o disponibilização do app foi utlizada a ferramenta heroku;

## Install heroku CLI
> [Install heroku cli](https://devcenter.heroku.com/articles/heroku-cli "Clique aqui para ver a documentação!")
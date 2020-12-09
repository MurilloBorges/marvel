# Marvel
Implementar uma aplicação server-side que conterá funções de autenticação, gerenciamentos de usuários e de comics/characters favoritos.


# Tecnologias utilizadas
- Para o backend foi utilizado a ferramenta NodeJS;

- Para o banco de dados onde será armazenado os usuários da aplicação foi utilizado o MongoDB;

- Para os testes automaizados foi utilizado o framework cypress;

- Para documentação da API, foi utilizado o swagger;


# Estratégia utilizada
- A autenticação na api é realizada via token jwt, que é gerado ao realizar login na aplicação;
- Implementada collection de usuário contendo os métodos:
> - GET by id -> busca o usuário pelo id (não exige autenticação);

> - GET all -> busca todos os usuários (não exige autenticação);

> - POST -> insere um usuário (não exige autenticação);

> - DELETE -> exclui o usuário (exige autenticação);

> - PATCH -> altera os dados do usuário (exige autenticação);

> - POST password -> insere uma nova senha para o usuário (exige autenticação);

- Os usuários da aplicação são armazenados no banco de dados MongoDB;

- Implementada collection de comics contendo os métodos:
> - GET by id -> busca a comic pelo id (exige autenticação);

> - GET all -> busca todas as comics (exige autenticação);

- Implementada collection de comics favoritas contado os métodos:
> - GET by id -> busca a comic favoritada pelo id (exige autenticação);

> - GET all -> busca todas as comics favoritadas (exige autenticação);

> - POST -> favorita a comic (exige autenticação);

> - DELETE -> desfavorita a comic (exige autenticação);

- Implementada collection de characters contendo os métodos:
> - GET by id -> busca o character pelo id (exige autenticação);

> - GET all -> busca todos os characters (exige autenticação);

- Implementada collection de characters favoritos contado os métodos:
> - GET by id -> busca o character favoritado pelo id (exige autenticação);

> - GET all -> busca todos os characters favoritados (exige autenticação);

> - POST -> favorita o character (exige autenticação);

> - DELETE -> desfavorita o character (exige autenticação);



#### Para a arquitetura do projeto foi utilizado o seguinte contexto de pastas:
> **marvel** (pasta pai de todo o projeto)

> > **backend** (pasta pai do backend)

> > > **cypress.json** (arquivo de configurações globais do cypress. Ex.: criar variáveis globais, definir resolução do navegador, setar uma URL padrão, entre outros.)

> > > **cypress** (pasta onde contém todo código e arquitetura cypress)

> > > > **fixtures** (pasta que oferecem configurações avançadas, sendo elas criações de arquivos json para uso global de dados nos testes exemplo usuario.json)

> > > > **integration** (pasta onde colocamos os nossos arquivos com os cenários de teste escritos no formato BDD (Desenvolvimento Guiado por Comportamento), sendo eles happy-path.spec.js "testes para realização do caminho feliz da aplicação", favoriteComic.spec.js "testes mais a fundo na funcionalidade de favoritar uma comic")

> > > > **plugins/index.js** (este arquivo é destinado para configuração de plugins. Utilizamos ele ao configurar o Cucumber.)

> > > > **support** (pasta onde colocamos os steps, os scripts e o mapeamento de elementos de nossos testes, como no arquivo commands.js em que são criadas funções de uso global, no arquivo index.d.ts podemos criar intellisense das funções construidas no commands.js)

> > > **node_modules** (pasta onde contém todas bibliotecas e dependências instaladas e utilizadas no projeto)

> > > **logs** (pasta onde contém o log de todas as requisições feitas para a api)

> > > **src** (pasta onde contém a arquitetura da api)

> > > > **middlewares** (contém os middlewares da aplicação com o logger para log das requisições da api, swagger para documentação, auth para validação de token jwt válido)

> > > > **controllers** (contém os controllers da aplicação ou seja onde fica toda regra de negócio para cada método/endpoint a ser consumido/publicado, isso inclui tratativas de erros, lógica de negócio, regras, e define a resposta e status do response a ser encaminhada para o client)

> > > > **models** (contém os modelos/estruturas dos objetos que teram vinculo e serão armazenados no banco de dados, exmplo model de usuário, contém a definiçao dos campos requiridos, tipagem, tamanho, e também regras como não trazer a senha do usuário do banco de dados e criptografar a mesma antes de ser inserida na base)

> > > > **helpers** (contém funções auxiliares que serão utilizadas em diversos lugares da aplicação, exemplo isNotEmpty que valida se um valor não é indefinido, nulo ou vazio)

> > > > **database** (contém a classe que instancia as configurações de conexão com o banco de dados e export um objeto de conexão criado e pronto para uso)

> > > > **config** (contém arquivos de configuração da aplicação, como database onde fica toda configuração de conexão com o banco de dados e auth onde fica o segredo para geração do token jwt e o tempo de expiração)

> > > > **routes.js** (define as rotas da api e também a partir de qual rota o token jwt é obrigatório)

> > > > **app.js** (define toda configuração e funcionalidades que o server utilizara para rodar a aplicação, sendo isso, express, middlewares, cors, routes, e instancia um server novo)

> > > > **server.js** (define a porta em que a aplicação será executada e mais algumas funcionalidades)


Criar um arquivo **.env** e copie o conteudo do arquivo **.env.example** para setar as variaveis de configuracao do sistema.


# Requisitos para a execução do projeto
- Ter o NodeJS instalado de preferência a última versão ou superior a v12.16.1;
> [Instalando o Node](https://nodejs.org/pt-br/download/package-manager/ "Clique aqui para aprender a instalar o Node!")

- Ter o gerenciador de dependências yarn instalado (npm também funciona, porém recomendo fortemente o yarn)
> [Instalando o yarn](https://classic.yarnpkg.com/pt-BR/docs/install/#debian-stable "Clique aqui para aprender a instalar o yarn!")


## Documentação da API offline
> [Documentação da API offline](https://app.swaggerhub.com/apis/MurilloBorges/marvel-collection_api/1.0.0 "Clique aqui para ver a documentação!")


## Configurando eslint com prettier no projeto
> [Documentação da configuração](https://marciofrancalima.com.br/blog/eslint-prettier-e-editorconfig/#:~:text=Como%20instalar%20ESLint%20e%20configur%C3%A1,terminal%3A%20yarn%20eslint%20%2D%2Dinit%20. "Clique aqui para ver a documentação!")


## Executando o projeto
1. Acessar a pasta backend e executar os seguintes comandos:
> yarn install

> yarn start (obs: configurar o arquivo .env na raiz da pasta backend: copiar conteúdo do .env.example)

> yarn cy:open (para executar os testes de api no backend) | (obs: para linux caso dê problema de permissão executar o comando "/home sudo chmod -R 777 murillo/.config/Cypress")

> com a api no ar, consulte a documentação, acessando o endpoint: http://localhost:3333/api-docs/

> divirta-se com as funcionalidades


2. Acessar a pasta frontend e executar os seguintes comandos:
> yarn install

> yarn start (obs: configurar o arquivo .env na raiz da pasta frontend: copiar conteúdo do .env.example)

> yarn cy:open (para executar os testes e2e no frontend) | (obs: para linux caso dê problema de permissão executar o comando "/home sudo chmod -R 777 murillo/.config/Cypress")

> usuário para testes da aplicação (porém você poderá cadastrar um usuário)
> > murilloborges@marvel.com

> > 123456

> divirta-se com as funcionalidades


## Executando o projeto através de docker run
1. Executar os seguintes comandos na pasta backend ou frontend
> Criar uma imagem

> > sudo docker build -t nodejs .

> Listando as imagens

> > sudo docker images

> Remover imagens paradas

> > sudo docker image prune

> Criar um container com a imagem criada acima

> > sudo docker run --name nodejs -p 3333:3333 -d nodejs

> Ativar um container

> > sudo docker start nodejs

> Estatisticas do container

> > sudo docker stats nodejs

> Listando o container

> > sudo docker ps -a

> Parar o container

> > sudo docker stop nodejs

> Finalizar o container

> > sudo docker kill nodejs

> Remover containers parados

> > sudo docker container prune

> Ver log do container

> > sudo docker logs ${id container}


## Executando o projeto através de docker-compose
1. Executar os seguintes comandos
> Subir o ambiente mongo e server

> > sudo docker-compose up

> Derrubar o ambiente

> > ctrl + c

> > sudo docker-compose down

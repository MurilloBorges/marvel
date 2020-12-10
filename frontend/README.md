# Marvel
Implementar uma aplicação client-side onde será encontrar todas as informações sobre as comics e characters da marvel;

## Aplicação first mobile

# Tecnologias utilizadas
- Para o frontend foi utilizado a ferramenta ReactJS;

- Para os testes automaizados e2e foi utilizado o framework cypress;

- Para os testes unitários foi utilizado o framework jest;


# Requisitos para a execução do projeto
- Ter o NodeJS instalado de preferência a última versão ou superior a v12.16.1;
> [Instalando o Node](https://nodejs.org/pt-br/download/package-manager/ "Clique aqui para aprender a instalar o Node!")

- Ter o gerenciador de dependências yarn instalado (npm também funciona, porém recomendo fortemente o yarn)
> [Instalando o yarn](https://classic.yarnpkg.com/pt-BR/docs/install/#debian-stable "Clique aqui para aprender a instalar o yarn!")


## Executando o projeto
1. Acessar a pasta frontend e executar os seguintes comandos:
> yarn install

> yarn start (obs: configurar o arquivo .env na raiz da pasta frontend: copiar conteúdo do .env.example)

> yarn cy:open (para executar os testes e2e no frontend) | (obs: para linux caso dê problema de permissão executar o comando "/home sudo chmod -R 777 murillo/.config/Cypress")

> divirta-se com as funcionalidades



## Executando o projeto através de docker run
1. Executar os seguintes comandos na pasta frontend
> Criar uma imagem

> > sudo docker build -t reactjs .

> Criar um container com a imagem criada acima

> > sudo docker run --name nodejs -p 3000:3000 -d reactjs

> Ativar um container

> > sudo docker start reactjs

> Parar o container

> > sudo docker stop reactjs

> Finalizar o container

> > sudo docker kill reactjs


## Executando o projeto através de docker-compose
1. Executar os seguintes comandos na pasta frontend
> Subir o ambiente frontend

> > sudo docker-compose up

> Derrubar o ambiente

> > ctrl + c

> > sudo docker-compose down

### URL para acessar o projeto http://localhost:3000/login ou http://localhost:3000


## Configurando eslint com prettier no projeto
> [Documentação da configuração](https://henriquetavares.com/pt-br/setting-eslint-on-reactjs-and-react-native/ "Clique aqui para ver a documentação!")


# URL frontend
> https://5fd18ddb00c42b2d1164989b--objective-yonath-b2a243.netlify.app/

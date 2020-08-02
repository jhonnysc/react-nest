## O que é?

Este repositorio é um exemplo de uma aplicação usando ReactJS e NestJS, ambos em Typescript ❤️.

- Backend em NestJS
- Frontend em ReactJS
- MongoDB

## Como rodar?

### Docker

### Existem tres modos para iniciar

#### Build com Dockerfile

Comandos devem ser exeuctado na pasta root

- Todas as envs são controladas pelo `.env` na root
- `sudo docker network create myprojectnetwork`
- `sudo docker-compose up --build` no root (`--build` só necessario na primeira vez)
- Docker irá instalar as depedencias automaticamente.

#### Pelo script no root usando docker-compose

- `sudo ./start.sh`
- Caso não consiga rodar o script, executar `chmod +x start.sh` e tente novamente.
- Envs são controladas pelos `.env` em suas respectivas pastas.

#### Manual

- Vá em cada pasta (backend e frontend)
- Configure os `.env` de acordo.
- Instale as depedencias `yarn`
- Inicie as aplicações `yarn start`

**Nota que o metodo manual irá exigir que você suba um banco local ou nuvem.**

Caso for usar este repositorio para algo, por favor adicionar os .envs ao `.gitignore`.

## Endereços

- Backend `http://localhost:4200/v1`
- Frontend `http://localhost:4100`
- Alterar portas caso necessario!

## Frontend

Frontend possui apenas uma page no root `/`

Caso for rodar manualmente, configurar os envs de acordo com o IP do backend.

### Features

- SPA (apesar de ter apenas uma rota)
- Listar todos os usuarios
- Criar usuario
- Atualizar Usuario
- Deletar Usuario
- Paginação
- Busca por nome e email
- Organização por nome do campo
- Botão para adicionar usuarios automaticamente
- Totalmente integrado com o backend

## Backend

Backend possui inumeras rotas, irei listar as rotas aqui porem o backend possui sua propria documentação que irei explicar um pouco mais a frente.

Caso for rodar manualmente, configurar os envs, em especial o endereço do banco (mongo).

Apesar de ter autenticação e sistema de login, não foi implementado no frontend neste repositorio por questões de simplicidade.

### Por quê?

Algumas explicações:

- Backend já possui varias features devido ao fato de eu ter usado um template criado por mim mesmo, [link aqui.](https://github.com/remxk2/nestjs-starter)
- Existem 2 controllers pra usuarios, um deles com rotas `/perms`, como já tinha algumas features implementadas no backend como ACL e JWT, eu achei interessante deixar essas rotas implementadas apenas para visualização e testes caso queira.
- Por que usar tantos `index.ts`? Para o codigo não ficar carregado, nós podemos criar varios services referentes ao modulo, cada um com uma responsabilidade, então para não ficar importando os services pelos nomes, o `index.ts` junta todos eles e os exporta, isto facilita na hora de importar e deixa o codigo bem mais organizado.

### Features

- Altamente tipado
- Testes automatizados (e2e e unitarios)
- Clean Architecture
- Autenticação basica (JWT)
- Login
- Rotas autorizadas
- ACL (Sistema de permissões)
- Swagger

### Swagger

- Para ver a documentação gerada pelo Swagger acessar a rota `http://localhost:3100/api` do backend (alterar porta caso necessario)

### Rotas

#### `POST` /auth/login

```json
{
  "email": "string",
  "password": "string"
}
```

#### `DELETE` /developers/:id

#### `GET` /developers

- Query Params `limit*` `page*` `email` `name` `sort_by`

#### `UPDATE` /developers/:id

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "sex": "string",
  "hobby": "string",
  "dayOfBirth": "2020-08-02T04:27:02.913Z",
  "age": 0,
  "roles": ["string"]
}
```

#### `GET` /developers/:id

#### `POST` /developers

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "sex": "string",
  "hobby": "string",
  "dayOfBirth": "2020-08-02T04:27:02.913Z",
  "age": 0,
  "roles": ["string"]
}
```

#### `POST` /developers/auto

- Esta rota vai adicionar usuarios aleatorios automaticamente ao banco
- Query Params `quantity*`

## Scripts

A pasta root do backend possui um arquivo chamado `scripts.js`, este preenche automaticamente o banco, caso queira usa-lo por favor modificar a URL do seu banco.

Para inicia-lo basta apenas executar `node scripts.js`

**Por favor dê preferencia para o botão `Adicionar usuarios` no frontend caso queira adicionar usuarios automaticamente.**

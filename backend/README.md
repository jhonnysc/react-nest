<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Features

This repository has already setup authentication using JWT, Basic ACL Role system, Automated Tests with mocks (we never hit the database)

## Endpoints

- Base URL: `http://localhost:3000/v1`

### `/users`
- `(POST)` - Create User
```json
{
	"name": "Username",
	"email": "email@email.com",
	"password": "Password@123"
}
```

- `(GET)` - List users (only admins can list users, change in the database if you want an admin permission)

### `/auth`
- `/login (POST)`
```json
{
	"email": "email@email.com",
	"password": "Password@123"
}
```


## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# Tests
$ yarn run test

# test coverage
$ yarn run test:cov
```


## Stay in touch

- Author - [Jhonny](https://github.com/remxk2)


# Backend

O backend desta aplicação consiste em uma API Restful para o CRUD e login dos usuários e o CRUD das tarefas dos usuários, realizando a validação com as regras de negocio e persistência de dados utilizando Docker.

Tudo neste readme trata EXCLUSIVAMENTE sobre o backend.

## Data Diagram

O diagrama de dados pode ser visto abaixo:

<div align="center">
    <img width="50%" src="./db/model/data-diagram.png" alt="Data Diagram">
</div>

Onde o usuário realizará o login com o email e a senha (que será encriptada).

## Pré-requisitos

### Versões utilizadas

| Ferramenta | Versão |
| :----------: | :-------------: |
| Nodejs | 18.19.1 |
| Docker | 27.3.1 |
| Docker Compose | 2.20.3 |

### Scripts

É necessário permitir a execução do <a href="./scripts.sh">script</a> com:
```bash
chmod +x ./scripts.sh
```

Assim, é possível ver as opções de comandos executando:
```bash
./scripts.sh -h | --help
```

### .env

É possível utilizar um arquivo .env para a configuração de parâmetros como a porta em que a aplicação estará ativa, conexões com o banco de dados, modo da aplicação (dev ou prod) e chave para autenticação. Isto pode ser visto no arquivo <a href="./.env_sample">env_sample</a>.

É obrigatório a definição da variável JWT_KEY para rodar a aplicação. Contudo, se APP_MODE estiver definido como "dev", JWT_KEY não precisa estar definida.

Para as demais variáveis, a aplicação tem valores padrões pré estabelecidos para o caso de ausência no .env.

Para garantir funcionamento correto, sempre que alterar o .env, é recomendado encerrar, remover os volumes e iniciar os containers (com -d, -r e -b no script).  

## Comandos

### Build & Executar

Com o script configurado, para buildar a imagem e iniciar a aplicação, executa-se:
```bash
sudo ./scripts.sh -b | --build
```

### Logs

Para ver os logs dos containers:
```bash
sudo ./scripts.sh -l | --logs  --app | --db
```

### Terminal

Para acessar o terminal de um containers:
```bash
sudo ./scripts.sh -t | --terminal --app | --db
```

### Encerrar

Para encerrar a aplicação:
```bash
sudo ./scripts.sh -d | --down
```

### Limpar Docker

Para remover a imagem, containers, volume e network criadas, executa-se:
```bash
sudo ./scripts.sh -r | --remove
```

## Regras de Negócio

### Usuários

| Campo | Regras |
| :----------: | :-------------: |
| name | 2 <= tamanho <= 50 |
| name | Obrigatório |
| email | 5 <= tamanho <= 60 |
| email | incluir @ no meio |
| email | Obrigatório |
| password | 8 <= tamanho <= 30 |
| password | Obrigatório |

### Tarefas

| Campo | Regras |
| :----------: | :-------------: |
| title | 3 <= tamanho <= 100 |
| title | Obrigatório |
| description | tamanho <= 300 |
| description | Opcional |
| deadline | Data futura |
| deadline | Opcional |
| status | "pending" ou "complete" |
| status | Sṍ pode ser "complete" se estiver dentro do prazo |
| status | Opcional |

## Endpoints

A API desenvolvida pode ser acessada pelo <a href="localhost">localhost</a> passando a porta definida no .env.

### CRUD - Usuários

#### Create

```json
{
    "Método": "POST",
    "Url": "/users",
    "Body": {
        "name": "string",
        "email": "email",
        "password": "string"
    }
}
```

Retorno bem sucedido:

```json
{
    "statusCode": 201,
    "httpStatus": "Created",
    "message": "User created",
    "timeStamp": "datetime"
}
```

#### Read

```json
{
    "Método": "GET",
    "Url": "/users",
    "Headers": {
        "authorization": "Bearer Token"
    }
}
```

Retorno bem sucedido:

```json
{
    "statusCode": 200,
    "httpStatus": "OK",
    "message": "User retrieved",
    "data": [
        {
            "name": "userName"
        }
    ],
    "timeStamp": "datetime"
}
```

#### Update

```json
{
    "Método": "PUT",
    "Url": "/users",
    "Headers": {
        "authorization": "Bearer Token"
    },
    "body": {
        "name": "string",
        "email": "email",
        "password": "string"
    }
}
```

Retorno bem sucedido:

```json
{
    "statusCode": 200,
    "httpStatus": "OK",
    "message": "User updated",
    "timeStamp": "datetime"
}
```

#### Delete

```json
{
    "Método": "DELETE",
    "Url": "/users",
    "Headers": {
        "authorization": "Bearer Token"
    },
}
```

Retorno bem sucedido:

```json
{
    "statusCode": 200,
    "httpStatus": "OK",
    "message": "User deleted",
    "timeStamp": "datetime"
}
```

#### Login

```json
{
    "Método": "GET",
    "Url": "/users/login",
    "Body": {
        "email": "email",
        "password": "string"
    }
}
```

Retorno bem sucedido:

```json
{
    "statusCode": 200,
    "httpStatus": "OK",
    "message": "User logged in",
    "data": "Bearer Token",
    "timeStamp": "datetime"
}
```

#### Get All

Endpoint exclusivo para ambiente dev.

```json
{
    "Método": "GET",
    "Url": "/users/all"
}
```

Retorno bem sucedido:

```json
{
    "statusCode": 200,
    "httpStatus": "OK",
    "message": "Users retrieved",
    "data": [ "users" ],
    "timeStamp": "datetime"
}
```

<h6 align="center">by David Propato <a href="https://github.com/Propato">@Propato</a></h6>

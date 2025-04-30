# To Do List

Este é um projeto consiste em uma aplicação CRUD simples para um sistema de gerenciamento de tarefas (to-do list) utilizando React, Typescript e Bootstrap no Frontend e Nodejs, Typescript e MySQL no Backend.

Este repositório utiliza Docker para unir as aplicações do front e back end em um sistema isolado e preparado para executar em qualquer ambiente.

## Funcionalidades

- Logar
- Criar perfil
- Visualizar perfil
- Editar Perfil
- Excluir Perfil
- Criar tarefas
- Visualizar tarefas em tabela paginada
- Filtrar tarefas por status
- Buscar tarefas por título e descrição
- Marcar tarefas como concluídas
- Editar tarefas
- Excluir tarefas

## Regras de Negocio

### Usuários

|  Campo   |       Regras       |
| :------: | :----------------: |
|   name   | 2 <= tamanho <= 50 |
|   name   |    Obrigatório     |
|  email   | 5 <= tamanho <= 60 |
|  email   | incluir @ no meio  |
|  email   |    Obrigatório     |
| password | 8 <= tamanho <= 30 |
| password |    Obrigatório     |

### Tarefas

|    Campo    |                      Regras                       |
| :---------: | :-----------------------------------------------: |
|    title    |                3 <= tamanho <= 100                |
|    title    |                    Obrigatório                    |
| description |                  tamanho <= 300                   |
| description |                     Opcional                      |
|  deadline   |                    Data futura                    |
|  deadline   |                    Obrigatório                    |
|   status    |              "pending" ou "complete"              |
|   status    | Sṍ pode ser "complete" se estiver dentro do prazo |
|   status    |                    Obrigatório                    |

## :gear: Tools

### Backend

Foi desenvolvida uma API Rest para o backend da aplicação, realizando o CRUD de usuários e tarefas, aplicando todas as regras de negócios e realizando o login de usuário.

As ferramentas escolhidas para o backend foram:

| <img alt="Icon TypeScript" title="TypeScript" height="60" src="https://github.com/Propato/movies-review/assets/84464307/a3c73786-1f20-4910-a20d-75bb006bd31e"> | <img alt="Icon Node" title="Node" height="60" src="https://github.com/Propato/movies-review/assets/84464307/3a89b223-3772-4168-8eb0-a09493f52b9f"> | <img alt="Icon MySQL" title="MySQL" height="60" src="https://github.com/Propato/movies-review/assets/84464307/cae15bc6-56cf-4659-9f25-843872d4eba3"> | <img alt="Icon Docker" title="Docker" height="60" src="https://github.com/Propato/movies-review/assets/84464307/2722d075-35c7-498c-bef4-310a86d317a8"> |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                           TypeScript                                                                           |                                                                        Node                                                                        |                                                                        MySQL                                                                         |                                                                         Docker                                                                         |

> Mais informações (como endpoints e as regras aplicadas) na pasta <a href="./to-do-list-backend/">backend</a>.

### Frontend

Foi construído uma interface visualmente agradável, responsiva e funcional, apresentando todas as funcionalidades exigidas e algumas mais.

As ferramentas escolhidas para o frontend foram:

| <img alt="Icon TypeScript" title="TypeScript" height="60" src="https://github.com/Propato/movies-review/assets/84464307/a3c73786-1f20-4910-a20d-75bb006bd31e"> | <img alt="Icon React" title="React" height="60" src="https://github.com/user-attachments/assets/26ad264a-fb5f-4133-806a-41b13bd0bb34"> | <img alt="Icon Bootstrap" title="Bootstrap" height="60" src="https://github.com/user-attachments/assets/677f865b-8e77-4a24-b56c-0ee6ebc3ae83"> |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                           TypeScript                                                                           |                                                                 React                                                                  |                                                                   Bootstrap                                                                    |

> Mais informações (como rotas e as regras aplicadas) na pasta <a href="./to-do-list-frontend/">frontend</a>.

## Pré-requisitos

### Versões utilizadas

|   Ferramenta   | Versão |
| :------------: | :----: |
|     Docker     | 27.3.1 |
| Docker Compose | 2.20.3 |

### .env

É usado um .env para o backend e outro para o frontend para garantir maior versatilidade e modularização do código, contudo, há valores padrões pré-estabelecidos que garantem a funcionalidade mesmo sem o .env.

Porém, é necessário passar a variável APP_MODE=dev para o backend para que ele use os valores padrões com maior segurança.

Recomenda-se seguir o <a href="./.env_sample">.env_sample</a>, que é um .env único usado tanto para o back quanto para o front.

### Scripts

É necessário permitir a execução com:

```bash
chmod +x ./*.sh
```

### Executando

```bash
./start.sh
```

### Encerrando

```bash
./stop.sh
```

### Limpando recursos Docker

```bash
./clean.sh
```

<h6 align="center">by David Propato <a href="https://github.com/Propato">@Propato</a> </h6>

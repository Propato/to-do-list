# Frontend

O frontend deste projeto consiste em uma aplicação com React, Typescript e Bootstrap para criar uma interface web que permita ao usuário:

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

Todas essas funções implementadas seguem as regras de negócio propostas.

O login do usuário é mantido através do armazenamento do token de autenticação do backend no Local Storage do navegador. 

Tudo neste readme trata EXCLUSIVAMENTE sobre o frontend.

## Pré-requisitos

### Versões utilizadas

| Ferramenta | Versão |
| :----------: | :-------------: |
| Nodejs | 18.19.1 |

### .env

É usado um .env para definir a url da API do banco de dados para maior versatilidade, contudo, há valores padrões pré estabelecidos para o caso de ausência do .env.

## Comandos

### Executar

Com o backend já em execução:

```bash
npm start
```

### Encerrar

```bash
Ctrl + C
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
| deadline | Obrigatório |
| status | "pending" ou "complete" |
| status | Sṍ pode ser "complete" se estiver dentro do prazo |
| status | Obrigatório |

## Rotas

Temos, a partir da rota inicial: <a href="localhost:3000">localhost:3000</a>

Usuários não logados que tentarem acessar rotas que necessitam da autenticação serão redirecionados para a tela de login.

### /

Página inicial e tabela de tarefas. Acessível somente a usuários logados.

É possível realizar a exclusão, troca de status, busca e filtragem das tarefas nesta página.

### /user/profile

Página do perfil do usuário, permite edição do perfil e exclusão. Acessível somente a usuários logados.

### /task/new

Página de criação de tarefa. Acessível somente a usuários logados.

### /task/edit/:taskId

Página de edição de tarefa, também permite sua exclusão. Acessível somente a usuários logados.

### /user/new

Página de criação de usuário. Acessível a todos os usuários deslogados.

### *

Qualquer outra rota redirecionará o usuário para a página inicial.

<h6 align="center">by David Propato <a href="https://github.com/Propato">@Propato</a></h6>

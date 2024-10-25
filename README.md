# Teste Athenas

### CRUD: To-Do list

Este é um projeto para a etapa de teste do processo seletivo para a vaga de estágio na Athenas Tecnologia. Consiste em desenvolver uma aplicação CRUD simples utilizando a stack de minha preferência onde devo criar um sistema de gerenciamento de tarefas (to-do list).

## Minha Solução

Foi desenvolvido um projeto fullstack, com backend e frontend que se comunicam para gerir os dados e apresenta-los, armazenando-os com segurança e persistência. possibilitando as seguintes funcionalidades:

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

As regras de negocio aplicadas são:

#### Usuários

| Campo | Regras |
| :----------: | :-------------: |
| name | 2 <= tamanho <= 50 |
| name | Obrigatório |
| email | 5 <= tamanho <= 60 |
| email | incluir @ no meio |
| email | Obrigatório |
| password | 8 <= tamanho <= 30 |
| password | Obrigatório |

#### Tarefas

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

### :gear: Tools

#### Backend

Foi desenvolvida uma API Rest para o backend da aplicação, realizando o CRUD de usuários e tarefas, aplicando todas as regras de negócios e realizando o login de usuário.

As ferramentas escolhidas para o gerenciamento do backend foram:

| <img alt="Icon TypeScript" title="TypeScript" height="60" src="https://github.com/Propato/movies-review/assets/84464307/a3c73786-1f20-4910-a20d-75bb006bd31e"> | <img alt="Icon Node" title="Node" height="60" src="https://github.com/Propato/movies-review/assets/84464307/3a89b223-3772-4168-8eb0-a09493f52b9f"> | <img alt="Icon MySQL" title="MySQL" height="60" src="https://github.com/Propato/movies-review/assets/84464307/cae15bc6-56cf-4659-9f25-843872d4eba3"> | <img alt="Icon Docker" title="Docker" height="60" src="https://github.com/Propato/movies-review/assets/84464307/2722d075-35c7-498c-bef4-310a86d317a8"> |
| :----------: | :-------------: | :------: | :------: |
| TypeScript | Node | MySQL | Docker |

>> Mais informações (como endpoints e as regras aplicadas) na pasta <a href="./backend/">backend</a>.

#### Frontend

Foi construído uma interface visualmente agradável, responsiva e funcional, apresentando todas as funcionalidades exigidas e algumas mais.

As ferramentas escolhidas para o gerenciamento do backend foram:

| <img alt="Icon TypeScript" title="TypeScript" height="60" src="https://github.com/Propato/movies-review/assets/84464307/a3c73786-1f20-4910-a20d-75bb006bd31e"> | <img alt="Icon React" title="React" height="60" src=""> | <img alt="Icon Bootstrap" title="Bootstrap" height="60" src=""> |
| :----------: | :-------------: | :------: | :------: |
| TypeScript | React | Bootstrap |

>> Mais informações (como rotas e as regras aplicadas) na pasta <a href="./frontend/">frontend</a>.

### Pré-requisitos

#### Versões utilizadas

| Ferramenta | Versão |
| :----------: | :-------------: |
| Nodejs | 18.19.1 |
| npm | 9.2.0 |
| Docker | 27.3.1 |
| Docker Compose | 2.20.3 |

#### .env

É usado um .env para o backend e outro para o frontend para garantir maior versatilidade e modularização do código, contudo, há valores padrões pré-estabelecidos que garantem a funcionalidade mesmo sem o .env.

Porém, é necessário passar a variável APP_MODE=dev para o backend para que ele use os valores padrões com maior segurança.

Assim, foi passado neste repositório um .env já com os valores definidos.

#### Scripts

É necessário permitir a execução do <a href="./scripts.sh">script</a> com:
```bash
chmod +x ./scripts.sh
```

Assim, é possível ver as opções de comandos executando:
```bash
./scripts.sh -h | --help
```

### Executando

Como já existe o .env no repositório e com o script já configurado, basta executar:

```bash
sudo ./scripts -b
```

### Encerrando App

```bash
Crtl + C
sudo ./scripts -d
```

### Limpando dados & arquivos

```bash
sudo ./scripts -r
```


<h6 align="center">by David Propato <a href="https://github.com/Propato">@Propato</a> </h6>

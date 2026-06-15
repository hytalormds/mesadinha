# Mesadinha

O Mesadinha é um aplicativo desenvolvido para ajudar responsáveis a organizar tarefas e recompensas dos filhos.

Por meio do aplicativo, os responsáveis podem cadastrar tarefas, acompanhar sua realização e controlar o saldo acumulado pelas crianças. A proposta é incentivar a responsabilidade e apresentar conceitos básicos de educação financeira de maneira simples.

## Funcionalidades

### Responsável

- Criar uma conta e realizar login;
- cadastrar e editar filhos;
- criar, editar e excluir tarefas;
- acompanhar as tarefas cadastradas;
- aprovar ou recusar tarefas concluídas;
- creditar recompensas no cofrinho;
- consultar os saldos dos filhos;
- registrar retiradas;
- consultar movimentações financeiras.

### Criança

- Realizar login;
- visualizar suas tarefas;
- atualizar o andamento das tarefas;
- acompanhar o saldo do próprio cofrinho.

## Tecnologias utilizadas

### Aplicativo

- React Native;
- Expo;
- TypeScript;
- React Navigation;
- Axios;
- React Native Gesture Handler;
- React Native Reanimated;
- DateTimePicker.

### API

- Node.js;
- Fastify;
- TypeScript;
- TypeORM;
- SQLite;
- JWT;
- Bcrypt;
- Swagger.

## Estrutura de pastas

```text
mesadinha/
├── android/
├── scripts/
│   └── create_local_db.js
│
├── src/
│   ├── app/
│   │   └── screens/
│   │       ├── CadastroTarefa/
│   │       ├── CadastroUsuario/
│   │       ├── Cofrinho/
│   │       ├── Familia/
│   │       ├── ListaTarefas/
│   │       ├── Login/
│   │       └── VincularFilho/
│   │
│   ├── assets/
│   │   ├── adaptive-icon.png
│   │   ├── icon.png
│   │   └── logo.png
│   │
│   ├── componentes/
│   │   ├── Button/
│   │   └── Input/
│   │
│   ├── domain/
│   │   ├── carteira/
│   │   ├── tarefa/
│   │   └── user/
│   │
│   ├── hooks/
│   │
│   ├── infra/
│   │   ├── database/
│   │   │   └── typeorm/
│   │   │       └── mesadinha/
│   │   │           ├── entities/
│   │   │           ├── migrations/
│   │   │           ├── repositories/
│   │   │           ├── seeders/
│   │   │           └── data-source.ts
│   │   │
│   │   └── web/
│   │       ├── controllers/
│   │       │   ├── carteira/
│   │       │   ├── tarefa/
│   │       │   └── user/
│   │       ├── middlewares/
│   │       └── routes/
│   │           ├── schemas/
│   │           ├── auth.routes.ts
│   │           ├── carteira.routes.ts
│   │           ├── tarefa.routes.ts
│   │           └── index.ts
│   │
│   ├── routes/
│   │   ├── index.tsx
│   │   └── styles.ts
│   │
│   ├── services/
│   │   └── mesadinha/
│   │
│   ├── shared/
│   │   └── api/
│   │
│   ├── types/
│   │
│   ├── index.ts
│   └── server.ts
│
├── .env.example
├── .gitignore
├── App.tsx
├── app.json
├── eas.json
├── index.ts
├── metro.config.js
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── tsconfig.backend.json
```

As telas do aplicativo ficam em `src/app/screens`. A parte relacionada à API, às regras de negócio e ao banco de dados está organizada dentro das pastas `domain` e `infra`.

## Perfis de usuário

O sistema possui dois tipos de usuário:

| Perfil      | Permissões principais                                          |
| ----------- | -------------------------------------------------------------- |
| Responsável | Cadastrar filhos, administrar tarefas, recompensas e carteiras |
| Criança     | Visualizar suas tarefas e acompanhar o próprio cofrinho        |

## Como executar

Clone o repositório:

```bash
git clone https://github.com/hytalormds/mesadinha.git
cd mesadinha
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto seguindo o modelo do `.env.example`:

```env
APP_SECRET_KEY=mesadinha-dev-secret
API_PORT=3001
EXPO_PUBLIC_API_URL=http://10.0.2.2:3001
```

O endereço `10.0.2.2` deve ser utilizado no emulador Android.

Para testar em um celular físico, utilize o endereço IP do computador onde a API está sendo executada:

```env
EXPO_PUBLIC_API_URL=http://192.168.15.10:3001
```

Nesse caso, o computador e o celular precisam estar conectados à mesma rede.

## Executando o banco e a API

Execute as migrations do banco de dados:

```bash
npm run api:migration:run
```

Inicie a API:

```bash
npm run api:dev
```

A documentação da API estará disponível em:

```text
http://localhost:3001/docs
```

## Executando o aplicativo

Para iniciar o Expo:

```bash
npm start
```

Para executar no Android:

```bash
npm run android
```

Para executar no iOS:

```bash
npm run ios
```

Para executar no navegador:

```bash
npm run web
```

## Principais rotas da API

### Autenticação e filhos

```text
POST /auth/register
POST /auth/login
GET  /auth/children
POST /auth/children
PUT  /auth/children/:id
```

### Tarefas

```text
GET    /tarefa
GET    /tarefa/status
POST   /tarefa
PUT    /tarefa
DELETE /tarefa/:id
```

### Carteira e movimentações

```text
GET  /carteira
GET  /movimentacao
POST /carteira/creditar-tarefa
POST /carteira/sacar
```

## Scripts disponíveis

| Comando                        | Finalidade                              |
| ------------------------------ | --------------------------------------- |
| `npm start`                    | Inicia o Expo                           |
| `npm run android`              | Executa o aplicativo no Android         |
| `npm run ios`                  | Executa o aplicativo no iOS             |
| `npm run web`                  | Executa o aplicativo no navegador       |
| `npm run db:create`            | Cria o banco de dados local             |
| `npm run api:dev`              | Inicia a API em modo de desenvolvimento |
| `npm run api:start`            | Inicia a API                            |
| `npm run api:migration:run`    | Executa as migrations                   |
| `npm run api:migration:revert` | Reverte a última migration              |

## Observações

O projeto utiliza um banco SQLite local e foi desenvolvido para fins acadêmicos.

Para utilizar o aplicativo fora da rede local, será necessário publicar a API em um servidor acessível pela internet. Também será necessário configurar o endereço publicado na variável `EXPO_PUBLIC_API_URL`.

## Autores

Projeto desenvolvido para a disciplina de Sistemas Móveis.

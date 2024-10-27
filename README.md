# Projeto Cinescope

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descrição

Cinescope é uma API desenvolvida com o framework NestJS, que permite a busca e gerenciamento de filmes. Este projeto utiliza TypeScript e Prisma para interagir com um banco de dados PostgreSQL.

## Configuração do Projeto

Para configurar o projeto, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu_usuario/cinescope.git
   cd cinescope
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   ```
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
   API_KEY=sua_api_key
   API_URL=https://api.themoviedb.org/3
   FRONTEND_URL=http://localhost:3000
   PORT=3434
   ```

## Compilar e Executar o Projeto

Para compilar e executar o projeto, utilize os seguintes comandos:

- Modo de desenvolvimento:
  ```bash
  pnpm run start
  ```

- Modo de observação:
  ```bash
  pnpm run start:dev
  ```

- Modo de produção:
  ```bash
  pnpm run start:prod
  ```

## Estrutura do Projeto

```
cinescope/
├── dist/                     # Compiled output
├── node_modules/             # Node.js modules
├── prisma/                   # Prisma related files
│   ├── migrations/           # Database migrations
│   ├── schema.prisma         # Prisma schema file
│   └── prisma.module.ts      # Prisma module
├── src/                      # Source code
│   ├── app.module.ts         # Main application module
│   ├── main.ts               # Entry point of the application
│   ├── movies/               # Movies feature module
│   │   ├── movies.controller.ts  # Controller for movies
│   │   ├── movies.service.ts     # Service for movies
│   │   └── movies.module.ts      # Movies module
│   └── prisma/               # Prisma service
│       └── prisma.service.ts  # Prisma service implementation
├── test/                     # Test files
│   └── app.e2e-spec.ts       # End-to-end tests for the application
├── .gitignore                # Git ignore file
├── biome.json                # Biome configuration
├── jest-e2e.json            # Jest configuration for end-to-end tests
├── nest-cli.json             # Nest CLI configuration
├── package.json              # Project metadata and dependencies
├── pnpm-lock.yaml            # Lock file for pnpm
├── README.md                 # Project documentation
└── tsconfig.json             # TypeScript configuration
```

## Licença

Cinescope é licenciado sob a [licença MIT](https://github.com/nestjs/nest/blob/master/LICENSE).

# Desafio técnico +A Educação



## Credenciais de acesso:

**usuário:** admin

**senha**: 12345678



## Inicialização com docker compose ( ./ ):

**Para Inicializar a Aplicação Completa:**

```shell
docker-compose up
```

## Inicialização do back-end ( ./back-end )

Instale as dependências necessárias:

```shell
yarn install
```

Execute as migrações do Prisma:

```shell
yarn prisma migration deploy
```

Realize as operações de seeding:

```shell
yarn prisma db seed
```

Inicie a aplicação:

```shell
yarn dev
```

## Inicialização do front-end ( ./front-end )

Instale as dependências necessárias:

```shell
yarn install
```

Inicie a aplicação:

```shell
yarn dev
```

## Testes automatizados ( ./back-end )

Para executar testes unitários:

```bash
yarn test:unit
```

Para realizar testes de ponta a ponta:

```bash
yarn test:e2e
```

Execute todos os testes:

```bash
yarn test
```

## Build ( ./back-end )

Execute o build

```shell
yarn build
```

Inicie a aplicação

```shell
yarn prod
```

## Arquitetura utilizada:

```
.
├── front-end           # Código-fonte do Front-end com arquitetura padrão do Vue.js 3
└── back-end            # Código-fonte do Back-end
    ├── dist            # Artefatos de build e distribuição
    ├── docker          # Configurações relacionadas ao Docker
    ├── prisma          # Configurações e arquivos relacionados ao Prisma
    └── src             # Código-fonte principal do projeto
        ├── @types      # Tipos de TypeScript compartilhados
        ├── config      # Configuração do projeto
        ├── factories   # Factories para padronização de respostas da API.
        ├── helpers     # Módulos utilitários
        ├── http        # Camada HTTP da aplicação
        │   ├── app.ts         # Configuração do server Express
        │   ├── controllers    # Controllers da aplicação
        │   ├── middlewares    # Middlewares da aplicação
        │   ├── routes         # Definições de rotas da aplicação
        │   └── validations    # Lógica de validação para rotas
        ├── index.ts    # Arquivo principal de inicialização
        └── services    # Serviços da aplicação

    └── tests            # Testes automatizados
        ├── e2e          # Testes de ponta a ponta
        └── unit         # Testes de unidade
            └── services # Testes para a camada de serviços

```

## **Bibliotecas de Terceiros**

## Back-end:

**Dependecias:**

- **@prisma/client**
- **bcrypt**
- **cors**
- **dotenv**
- **express**
- **express-async-errors**
- **jsonwebtoken**
- **zod**

**Dependências de desenvolvimento:**

- **@babel/cli**
- **@babel/core**
- **@babel/node**
- **@babel/preset-env**
- **@babel/preset-typescript**
- **babel-jest**
- **babel-plugin-module-resolver**
- **dotenv-cli**
- **jest**
- **jest-mock-extended**
- **prisma**
- **supertest**
- **ts-jest**
- **ts-node**
- **ts-node-dev**
- **tsc**
- **tsconfig-paths**
- **typescript**

## Front-end

**Dependências:**

- **axios**
- **maska**
- **pinia**
- **vee-validate**
- **vue**
- **vue-router**
- **vue3-toastify**
- **vuetify**

## Aprimoramentos e Evoluções Futuras

- **Documentação Aprimorada com Swagger:**

- **Padronização de Código com EsLint e Prettier**

- **Internacionalização dos Erros no Back-End com i18n**.

- **Internacionalização do Front-End com i18n**.

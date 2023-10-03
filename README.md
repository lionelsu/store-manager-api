<!-- Este é um comentário: omitir os tópidos redundantes -->
<!--  **| [Brazil](README.md) | [asdf](README_en.md) |** -->

# Store Manager

O Store Manager é uma API RESTful que oferece um conjunto completo de funcionalidades CRUD (Create, Read, Update, Delete) para atender às suas necessidades de gerenciamento de vendas (do tipo drop shipping). Este sistema foi desenvolvido com foco na qualidade, utilizando a metodologia TDD (Test-Driven Development) e seguindo uma arquitetura em camadas consistente, com os componentes Model, Service e Controller (MSC).

<details>

<summary>Ferramentas Utilizadas</summary>

- **Tecnologias Principais:**
  - Node.js
  - Express.js
  - MySQL Server

- **Testes:**
  - Mocha
  - Chai
  - Sinon

- **Documentação:**
  - Swagger
  - Postman

</details>

## Pré-Requisitos

Utilize o Docker:

- [Docker & Docker Compose](https://docs.docker.com/compose/)

<!-- ## Features -->
## Instalação

1. Clonar o Repositório

    Primeiro, copie ou clone este repositório para o seu sistema local usando o Git:

    ```bash
    git clone git@github.com:lionelsu/store-manager-api.git && cd store-manager-api
    ```

2. Iniciar o Contêiner Docker

    Utilize o Docker Compose para iniciar o contêiner do Store Manager:

    ```bash
    docker compose up -d
    ```

3. Acesse a documentação da API no navegador:

    ```http
    http://127.0.0.1:3001/
    ```

## Uso

Para interagir com o Store Manager, você pode usar os seguintes comandos:

Visualização de Logs

```bash
docker logs -n 10 -f store_manager
```

Linha de Comando Interativa, usada para **[testar](#testes)** a aplicação

```bash
docker exec -it store_manager bash
```

## Rotas da API

**Produtos:**

- **`POST /products`**: Cadastra um novo produto.
- **`GET /products`**: Retorna todos os produtos cadastrados.
- **`GET /products/:id`**: Retorna um produto específico pelo ID.
- **`GET /products/search`**: Retorna produtos com base na consulta de nome.
- **`PUT /products/:id`**: Atualiza um produto pelo ID.
- **`DELETE /products/:id`**: Exclui um produto pelo ID.

**Vendas:**

- **`POST /sales`**: Cadastra uma nova venda.
- **`GET /sales`**: Retorna todas as vendas cadastradas.
- **`GET /sales/:id`**: Retorna uma venda específica pelo ID.
- **`PUT /sales/:saleId/products/:productId/quantity`**: Atualiza a quantidade de um produto em uma venda.
- **`DELETE /sales/:id`**: Exclui uma venda pelo ID.

## Configuração

Variáveis de ambiente dentro do container:

```mysql
MYSQL_USER: root
MYSQL_PASSWORD: password
MYSQL_HOSTNAME: db
MYSQL_PORT: 3306
PORT: 3001
```

## Testes

- Dentro da **[linha de comando interativa](#uso)**, você pode executar os seguintes testes:

  - Testes Unitários:

  ```bash
  npm run test:mocha
  ```

  - Cobertura de Testes:

  ```bash
  npm run test:coverage
  ```

  - Testes de Mutação:

  ```bash
  npm run test:mutation
  ```

## Habilidades desenvolvidas

Usei o `Node.js` com o `Express.js` como base da minha aplicação, permitindo criar facilmente endpoints `HTTP` para atender às necessidades do sistema.

O banco de dados `MySQL Server foi escolhido para armazenar dados relacionados a produtos, vendas e outros elementos cruciais do sistema.

A qualidade do código foi garantida por meio de testes rigorosos usando `Mocha`, `Chai` e `Sinon`. Esses testes avaliaram minuciosamente os endpoints, serviços e funções para garantir que tudo funcionasse corretamente.

Para documentar a `API`, utilizei o `Swagger`, criando um guia detalhado que inclui informações sobre rotas, parâmetros e exemplos práticos.

Também disponibilizei uma coleção no `Postman` para facilitar testes e interações com a `API`.

Com essas etapas concluídas, estou confiante na entrega de uma `API` sólida e funcional, pronta para atender às necessidades dos usuários.

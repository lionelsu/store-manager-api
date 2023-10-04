const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});
const glob = require('glob');

const output = './swagger-output.json';
const endpoints = glob.sync('./src/app.js');

const doc = {
  info: {
      version: '1.0.0',
      title: 'Store Manager API',
      description: '<p><strong>Store Manager</strong> is a <strong>RESTful API</strong> offering comprehensive <strong>CRUD</strong> functionality for <strong>sales management</strong>, specifically <strong>drop shipping</strong>. Developed with <strong>TDD</strong> methodology, it follows a layered architecture (<strong>MSC</strong>).</p>',
  },
  host: 'localhost:3001',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
      {
          name: 'Products',
          description: 'Endpoints',
      },
  ],
  /*
  securityDefinitions: {
      api_key: {
          type: 'apiKey',
          name: 'api_key',
          in: 'header',
      },
      petstore_auth: {
          type: 'oauth2',
          authorizationUrl: 'https://petstore.swagger.io/oauth/authorize',
          flow: 'implicit',
          scopes: {
              read_pets: 'read your pets',
              write_pets: 'modify pets in your account',
          },
      },
  },
  */
  definitions: {
    AllProducts: [
      {
        id: 1,
        name: "Martelo de Thor"
      },
      {
        id: 2,
        name: "Traje de encolhimento"
      }
      /* ... */
    ],
    ProductById: {
      id: 1,
      name: "Martelo de Thor"
    },
    AddUser: {
        $name: 'Jhon Doe',
        $age: 29,
        about: '',
    },
  },
};

swaggerAutogen(output, endpoints, doc);

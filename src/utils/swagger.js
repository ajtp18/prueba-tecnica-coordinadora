const swagger = require('@fastify/swagger');

// Configuración de Swagger
const swaggerOptions = {
    routePrefix: '/doc',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'API de Mi Aplicación', // Cambia este título
        description: 'Documentación de la API de Mi Aplicación',
      },
      servers: [{ url: 'http://localhost:3000', description: 'Local development server' }],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
      security: [{ apiKey: [] }],
    },
  };

module.exports = swaggerOptions;
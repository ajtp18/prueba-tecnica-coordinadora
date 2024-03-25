// src/server.js
const fastify = require('fastify')({ logger: true });
const routes = require('./routes');

fastify.register(require('fastify-jwt'), {
  secret: 'supersecret'
});

routes.forEach((route, index) => {
  fastify.route(route);
});

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Servidor escuchando en ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
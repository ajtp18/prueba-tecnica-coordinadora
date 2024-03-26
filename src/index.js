const fastify = require('fastify')({ logger: true });
const db = require('./db/index');
const eventRoutes = require('./routes/event/eventRouter');
const userRoutes = require('./routes/users/userRoutes');

// Conectar a la base de datos al iniciar la aplicación
db.connect()
  .then(() => {
    console.log('Conexión establecida a la base de datos');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  });

fastify.register(eventRoutes);
fastify.register(userRoutes);

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
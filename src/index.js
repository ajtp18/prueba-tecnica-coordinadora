const cors = require('fastify-cors');
const fastify = require('fastify')({ logger: true });
const swagger = require('@fastify/swagger');
const db = require('./db/index');
const swaggerOptions = require('./utils/swagger');

// Registra el plugin CORS
fastify.register(require('fastify-cors'), {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

fastify.register(swagger, swaggerOptions);

// Importa las rutas de los diferentes endpoints
const attendeeRoutes = require('./routes/attendee/attendeeRouter');
const eventRoutes = require('./routes/event/eventRouter');
const userRoutes = require('./routes/users/userRoutes');

// Conecta a la base de datos
db.connect()
  .then(() => {
    console.log('Conexión establecida a la base de datos');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  });

// Registra las rutas
fastify.register(eventRoutes);
fastify.register(attendeeRoutes);
fastify.register(userRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
fastify.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

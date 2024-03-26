// eventRoutes.js
const eventController = require('../../controllers/eventController');
const { authenticate } = require('../../middleware/auth.middleware');

async function eventRoutes(fastify, options, done) {
    fastify.post('/events', { preHandler: authenticate }, eventController.createEvent);
    fastify.get('/events', { preHandler: authenticate }, eventController.getEvents);
    done();
}

module.exports = eventRoutes;
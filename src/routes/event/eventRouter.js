// eventRoutes.js
const eventController = require('../../controllers/eventController');
const { authenticate } = require('../../middleware/auth.middleware');

async function eventRoutes(fastify, options, done) {
    // Ruta para el endpoint /events
    fastify.post('/events', {
        preHandler: authenticate,
        schema: {
            // Especifica el esquema del cuerpo de la solicitud para la creación de eventos
            body: {
                type: 'object',
                properties: {
                    eventTitle: { type: 'string' },
                    evenDescription: { type: 'string' },
                    eventDate: { type: 'string', format: 'date' },
                    eventLocation: { type: 'string' },
                },
                required: ['eventTitle', 'evenDescription', 'eventDate', 'eventLocation'],
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        eventTitle: { type: 'string' },
                        evenDescription: { type: 'string' },
                        eventDate: { type: 'string', format: 'date' },
                        eventLocation: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time'}
                    },
                },
            },
        },
    }, eventController.createEvent);

    fastify.get('/events', { preHandler: authenticate }, eventController.getEvents);
    fastify.put('/events/:id', { preHandler: authenticate }, eventController.updateEvent);
    fastify.delete('/events/:id', { preHandler: authenticate }, eventController.deleteEvent);
    done();
}

module.exports = eventRoutes;
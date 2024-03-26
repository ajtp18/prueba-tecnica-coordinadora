
const attendeeController = require('../../controllers/attendeeController');
const { authenticate } = require('../../middleware/auth.middleware');

async function attendeeRoutes(fastify, options, done) {
        // Ruta para el endpoint /events/:eventId/attendees
        fastify.post('/events/:eventId/attendees', {
            preHandler: authenticate,
            schema: {
                // Especifica el esquema del cuerpo de la solicitud para la creación de asistentes
                body: {
                    type: 'object',
                    properties: {
                        attendeeName: { type: 'string' },
                        phone: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                    },
                    required: ['attendeeName', 'email', 'phone',],
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            attendeeName: { type: 'string' },
                            phone: { type: 'string' },
                            email: { type: 'string', format: 'email' },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time'}
                        },
                    },
                },
            },
        }, attendeeController.createAttendee);
    
    fastify.get('/events/:eventId/attendees', { preHandler: authenticate }, attendeeController.getAttendees);
    fastify.put('/events/:eventId/attendees/:id', { preHandler: authenticate }, attendeeController.updateAttendee);
    fastify.delete('/events/:eventId/attendees/:id', { preHandler: authenticate }, attendeeController.deleteAttendee);
    done();
}

module.exports = attendeeRoutes;
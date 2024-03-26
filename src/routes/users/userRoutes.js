const userController = require('../../controllers/userRegisterController');
const authController = require('../../controllers/authController');
const { authenticate } = require('../../middleware/auth.middleware');


function userRoutes(fastify, options, done) {
    // Ruta para el endpoint /register
    fastify.post('/register', {
        schema: {
            // Especifica el esquema del cuerpo de la solicitud para el registro de usuarios
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                },
                required: ['username', 'password', 'email'],
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        message: { type: 'string' },
                    },
                },
            },
        },
    }, userController.createUser);

    // Ruta para el endpoint /login
    fastify.post('/login', {
        schema: {
            // Especifica el esquema del cuerpo de la solicitud para el inicio de sesión
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                },
                required: ['username', 'password'],
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        message: { type: 'string' },
                        token: { type: 'string' },
                    },
                },
            },
        },
    }, authController.login);

    done();
}

module.exports = userRoutes;
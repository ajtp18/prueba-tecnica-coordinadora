const userController = require('../../controllers/userRegisterController');
const authController = require('../../controllers/authController');
const { authenticate } = require('../../middleware/auth.middleware');


function userRoutes(fastify, options, done) {
    fastify.post('/register', userController.createUser);
    fastify.post('/login', authController.login);
    done();
}

module.exports = userRoutes;
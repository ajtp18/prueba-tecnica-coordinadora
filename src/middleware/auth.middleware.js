const jwt = require('jsonwebtoken');
const config = require('../utils/config');

function authenticate(req, reply, done) {
    const token = req.headers["x-access-token"];

    if (!token) {
        return reply.code(401).send({ message: 'Token de autenticación no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        done();
    } catch (err) {
        return reply.code(403).send({ message: 'Token inválido o caducado.' });
    }
}

module.exports = { authenticate };

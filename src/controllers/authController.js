// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const config = require('../utils/config');

async function login(req, reply) {
    const { username, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await db.query(query, [username]);
        const user = result.rows[0];

        if (!user) {
            return reply.code(404).send({ message: 'Usuario no encontrado.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return reply.code(401).send({ message: 'Contraseña incorrecta.' });
        }

        const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
            expiresIn: 86400
        });

        return reply.code(200).send({ token });
    }

    catch (error) {
        return reply.code(500).send({ message: 'Error al iniciar sesión', error });
    }
}

module.exports = { login };
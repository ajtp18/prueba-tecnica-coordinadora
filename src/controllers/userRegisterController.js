const bcrypt = require('bcrypt');
const db = require('../db/index');
const User = require('../models/user.model');


async function createUser(req, reply) {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return reply.code(409).send({ message: 'El usuario ya existe!!' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(username, hashedPassword);
        
        const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
        const values = [newUser.username, newUser.password];
        const result = await db.query(query, values);
        
        newUser.id = result.rows[0]

        return reply.code(201).send(newUser);
    } catch (error) {
        return reply.code(500).send({ error });
    }
}

module.exports = { createUser };
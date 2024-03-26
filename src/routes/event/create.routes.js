
const db = require('../../db/index');
const Event = require('../../models/event.model');

async function createEvent(req, reply) {
    const { name, description, date, location } = req.body;

    try {
        const newEvent = await Event.create(name, description, date, location);
        const query = 'INSERT INTO events (name, description, date, location) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [newEvent.name, newEvent.description, newEvent.date, newEvent.location];
        const result = await db.query(query, values);
        newEvent.id = result.rows[0];

        return reply.code(201).send(newEvent);
    }

    catch (error) {
        return reply.code(500).send({ message: 'Error al crear el evento', error });
    }
};

module.exports = { createEvent };


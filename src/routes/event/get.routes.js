
const db = require('../../db/index');
const Event = require('../../models/event.model');

async function getEvents(req, reply) {
    try {
        const query = 'SELECT * FROM events';
        const result = await db.query(query);
        const events = result.rows.map((event) => new Event(event.id, event.name, event.description, event.date, event.location));

        return reply.code(200).send(events);
    }

    catch (error) {
        return reply.code(500).send({ message: 'Error al obtener los eventos', error });
    }
};

module.exports = { getEvents };
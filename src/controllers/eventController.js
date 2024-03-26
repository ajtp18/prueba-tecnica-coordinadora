
const db = require('../../src/db/index');
const Event = require('../models/event.model');

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



module.exports = { createEvent, getEvents };


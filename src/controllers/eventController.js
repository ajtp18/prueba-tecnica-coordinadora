
const db = require('../../src/db/index');
const Event = require('../models/event.model');

async function createEvent(req, reply) {
    const { title, description, date, location } = req.body;

    try {
        const newEvent = await Event.create(title, description, date, location);
        const query = 'INSERT INTO events (title, description, date, location) VALUES ($1, $2, $3, $4) RETURNING id';
        const values = [newEvent.title, newEvent.description, newEvent.date, newEvent.location];
        const result = await db.query(query, values);
        newEvent.id = result.rows[0].id;

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
        const events = result.rows.map((event) => new Event(event.id, event.title, event.description, event.date, event.location, event.created_at, event.updated_at));

        return reply.code(200).send(events);
    }

    catch (error) {
        return reply.code(500).send({ message: 'Error al obtener los eventos', error });
    }
};


async function updateEvent(req, reply) {
    const { id } = req.query;
    const { title, description, date, location } = req.body;

    try {
        const query = 'UPDATE events SET title = $1, description = $2, date = $3, location = $4 WHERE id = $5';
        const values = [title, description, date, location, id];
        await db.query(query, values);

        return reply.code(200).send({ message: 'Evento actualizado', id: id, title: title, description: description, date: date, location: location, updated_at: new Date() });
    }

    catch (error) {
        return reply.code(500).send({ message: 'Error al actualizar el evento', error });
    }
}

async function deleteEvent(req, reply) {
    const { id } = req.query;

    try {
        const query = 'DELETE FROM events WHERE id = $1';
        const values = [id];
        await db.query(query, values);

        return reply.code(200).send({ message: 'Evento eliminado', id: id });
    }

    catch (error) {
        return reply.code(500).send({ message: 'Error al eliminar el evento', error });
    }
}

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };


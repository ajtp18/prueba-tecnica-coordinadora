const db = require('../../src/db/index');
const Attendee = require('../models/attendee.model');

async function createAttendee(req, reply) {
    const { eventId, name, email, phone } = req.body;

    try {
        const newAttendee = await Attendee.create(eventId, name, email, phone);

        const query = 'INSERT INTO attendees (event_id, name, email, phone) VALUES ($1, $2, $3, $4) RETURNING id';
        const values = [newAttendee.eventId, newAttendee.name, newAttendee.email, newAttendee.phone];
        const result = await db.query(query, values);
        newAttendee.id = result.rows[0]

        return reply.code(201).send(newAttendee);

    }

    catch (error) {
        return reply.code(500).send({ message: 'Error al crear el asistente', error });
    }
}

async function getAttendees(req, reply) {
    try {
        const query = 'SELECT * FROM attendees';
        const result = await db.query(query);
        const attendees = result.rows.map((attendee) => new Attendee(attendee.id, attendee.event_id, attendee.name, attendee.email, attendee.phone));

        return reply.code(200).send(attendees);
    }

    catch (error) {
        return reply.code(500).send({ message: 'Error al obtener los asistentes', error });
    }
}

async function updateAttendee(req, reply) {
    const { id } = req.query;
    const { eventId, name, email, phone } = req.body;

    try {
        const query = 'UPDATE attendees SET event_id = $1, name = $2, email = $3, phone = $4 WHERE id = $5';
        const values = [eventId, name, email, phone, id];
        await db.query(query, values);

        return reply.code(200).send({ message: 'Asistente actualizado', id: id, eventId: eventId, name: name, email: email, phone: phone, updated_at: new Date() });
    }

    catch (error) {
        return reply.code(500).send({ message: 'Error al actualizar el asistente', error });
    }
}

async function deleteAttendee(req, reply) {
    const { id } = req.query;

    try {
        const query = 'DELETE FROM attendees WHERE id = $1';
        const values = [id];
        await db.query(query, values);

        return reply.code(200).send({ message: 'Asistente eliminado', id: id });
    }

    catch (error) {
        return reply.code(500).send({ message: 'Error al eliminar el asistente', error });
    }
}

module.exports = { createAttendee, getAttendees, updateAttendee, deleteAttendee };
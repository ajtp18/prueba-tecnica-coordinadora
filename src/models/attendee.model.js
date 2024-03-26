class Attendee {
    constructor(id, eventId, name, email, phone) {
        this.id = id;
        this.eventId = eventId;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    static async create(eventId, name, email, phone) {
        return new Attendee(null, eventId, name, email, phone);
    }
    

    static async findById(id) {
        const query = 'SELECT * FROM attendees WHERE id = $1';
        const values = [id];
        const result = await db.query(query, values);

        if (result.rows.length) {
            const attendee = result.rows[0];
            return new Attendee(attendee.id, attendee.event_id, attendee.name, attendee.email, attendee.phone);
        }

        return null;
    }

    static async findByEventId(eventId) {
        const query = 'SELECT * FROM attendees WHERE event_id = $1';
        const values = [eventId];
        const result = await db.query(query, values);
        const attendees = result.rows.map((attendee) => new Attendee(attendee.id, attendee.event_id, attendee.name, attendee.email, attendee.phone));

        return attendees;
    }

    static async update(id, eventId, name, email, phone) {
        const query = 'UPDATE attendees SET event_id = $1, name = $2, email = $3, phone = $4 WHERE id = $5';
        const values = [eventId, name, email, phone, id];
        await db.query(query, values);
    }

    static async getEvent(id) {
        const query = 'SELECT * FROM events WHERE id = $1';
        const values = [id];
        const result = await db.query(query, values);

        if (result.rows.length) {
            const event = result.rows[0];
            return new Event(event.id, event.title, event.description, event.date, event.location, event.created_at, event.updated_at);
        }

        return null;
    }
    
}

module.exports = Attendee;
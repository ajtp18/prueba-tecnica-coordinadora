class Event {
    constructor(id, title, description, date, location, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.attendee = []
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static async create(title, description, date, location) {
        return new Event(null, title, description, date, location, null, null);
    }

    static async findById(id) {
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

module.exports = Event;
class Event {
    constructor(id, title, description, date, location, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Event;
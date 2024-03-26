// models/userModel.js
const pool = require('../db/index');

class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    static async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = $1';
        const values = [username];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async create(username, password) {
        return new User(null, username, password);
        
    }


}
module.exports = User;

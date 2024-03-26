// migrate-pg-config.js
module.exports = {
    'defaultEnv': 'dev',
    dev: {
        driver: 'pg',
        user: 'postgres',
        password: '123456789',
        host: 'localhost',
        database: 'event',
        port: 5432
    }
};
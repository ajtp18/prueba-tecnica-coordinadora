/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('events', {
        id: 'id',
        title: { type: 'varchar(255)', notNull: true },
        description: { type: 'text' },
        date: { type: 'timestamp' },
        location: { type: 'varchar(255)' },
        created_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp')
        },
        updated_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp')
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('events');
};

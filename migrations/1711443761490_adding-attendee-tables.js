/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('attendees', {
        id: 'id',
        event_id: {
            type: 'integer',
            notNull: true,
            references: 'events',
            onDelete: 'cascade',
        },
        name: {
            type: 'varchar(100)',
            notNull: true,
        },
        email: {
            type: 'varchar(100)',
            notNull: true,
        },
        phone: {
            type: 'varchar(20)',
            notNull: true,
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('attendees');
};

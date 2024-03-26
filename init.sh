# Comando para ejecutar el script DDL (creación de la tabla)
psql -U postgres -d events -f create_table_events.sql

bash DATABASE_URL=postgres://postgres:123456789@localhost:5432/event npm run migrate up
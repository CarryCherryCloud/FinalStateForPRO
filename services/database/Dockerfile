FROM mysql:latest AS development
COPY init_scripts/create_tables.sql ./docker-entrypoint-initdb.d/create_tables.sql
EXPOSE 3306
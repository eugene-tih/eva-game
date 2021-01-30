import Knex from 'knex';
import { Model } from 'objection';

export default async function() {
    // Initialize knex.

    // Why host is 'postgres-docker'
    // In docker-compose we create different containers (in my case node-docker/postgres-docker)
    // These container are not on the same localhost adapter, so I couldn't use 127.0.0.1 address
    // Instead we should point to the postgres-docker container's IP address
    // Which docker-compose automatically sets for us

    // So if I change container name in docker-compose I should change it here too
    const knex: Knex = Knex({
        client: 'pg',
        connection: {
            host: `postgres-docker`,
            user: process.env.POSTGRES_USER,
            password : process.env.POSTGRES_PASSWORD,
            database : process.env.POSTGRES_DB
        }
    });

    // Give the knex instance to objection.
    Model.knex(knex);
    await createSchema(knex);
}

async function createSchema(knex: Knex) {
    if (await knex.schema.hasTable('user')) {
        return;
    }

    await knex.schema.createTable('user', table => {
        table.increments('id').primary();
        table.string('name', 50);
    });
}

import Knex from 'knex';

export class DBConnection {
    public static async make(): Promise<Knex> {
        // Initialize knex.

        // Why host is 'postgres-docker'
        // In docker-compose we create different containers (in my case 'node-docker'/'postgres-docker')
        // These container are not on the same localhost adapter, so I couldn't use 127.0.0.1 address
        // Instead we should point to the 'postgres-docker' container's IP address
        // Which docker-compose automatically sets for us

        // So if I change container name in docker-compose I should change it here too
        const knex: Knex = Knex({
            client: 'pg',
            connection: {
                host: `postgres-docker`,
                user: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB
            }
        });

        return knex;
    }
}

export class Schemas {
    public static async maybeCreateSchemas(dbInstance: Knex): Promise<void> {
        if (await dbInstance.schema.hasTable('user')) {
            return;
        }

        await dbInstance.schema.createTable('user', table => {
            table.increments('id').primary();
            table.string('name', 50);
        });
    }
}

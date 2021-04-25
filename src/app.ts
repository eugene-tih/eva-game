import { fastify, FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';
import path from 'path';

import routes from './api/routes';
import { DBConnection, Schemas } from './infrastructure/Database';
import { Socket } from './infrastructure/WebSocket';

if (!process.env.NODE_ENV) {
    throw new Error('Env file was not loaded');
}

async function appInitialization(): Promise<FastifyInstance> {
    const app = fastify();

    const dbInstance = await DBConnection.make();
    await Schemas.maybeCreateSchemas(dbInstance);

    // @TODO: Get rid off handling static files in Node.js and move put this function to the Nginx
    app.register(fastifyStatic, { root: path.join(__dirname, '..', 'public') });
    app.register(routes);

    new Socket(app.server);

    process.on('unhandledRejection', (reason, promise) => {
        console.log('Reason is', reason);
        console.log('Promise is', promise);
        // Application specific logging, throwing an error, or other logic here
    });

    return app;
}

export default appInitialization;



import { fastify as Fastify, FastifyInstance } from 'fastify';
import Routes from './routes';
import DB from './DB';
import fastifyStatic from 'fastify-static';
import path from 'path';

function build(): FastifyInstance {
    const fastify = Fastify();

    // @TODO: Get rid off handling static files in Node.js and move put this function to the Nginx
    fastify.register(fastifyStatic, { root: path.join(__dirname, '..', 'public') });
    fastify.register(Routes);

    return fastify;
}

async function bootstrap(): Promise<void> {
    // We must listen on the port/host defined from ENV
    const port = Number(process.env.SERVER_PORT as string);
    const host = process.env.SERVER_HOST as string;

    try {
        const db = await DB();
        const server = build();
        const address = await server.listen(port, host);
        console.log(`Server listening at ${address} 🤘`);
        console.log(`Running environment is ${process.env.NODE_ENV}`);
    } catch (err) {
        console.error(`Program terminated unexpectedly`, err);
        process.exit(1);
    }
}

process.on('unhandledRejection', (reason, promise) => {
    console.log('Reason is', reason);
    console.log('Promise is', promise);
    // Application specific logging, throwing an error, or other logic here
});

if (require.main === module) {
    bootstrap();
}




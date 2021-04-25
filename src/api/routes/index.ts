import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
// import userRouters from './UserRouters';
// import gameRouters from './GameRouters';

export default function(fastify: FastifyInstance, opts: FastifyRegisterOptions<{}>, done: Function) {

    // fastify.register(userRouters, { prefix: 'user' });
    // fastify.register(gameRouters, { prefix: 'game' });

    fastify.get('/', async (request, reply) => {
        return reply.sendFile('index.html');
    });

    // fastify.get('/session/:id', async (request, reply) => {
    //     return 'done\n';
    // });
    //
    // fastify.get('/ping', async (request, reply) => {
    //     return 'pong\n';
    // });

    done();
}

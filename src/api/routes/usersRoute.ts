import { FastifyInstance, FastifyRegisterOptions, FastifyReply, FastifyRequest } from 'fastify';
import { createUserController } from '../controllers';

export default function (fastify: FastifyInstance, opts: FastifyRegisterOptions<{}>, done: Function) {
    fastify.post('/login', (request: FastifyRequest, reply: FastifyReply) => {

    });

    fastify.post('/', (request, reply) => createUserController.execute(request, reply));

    done();
}

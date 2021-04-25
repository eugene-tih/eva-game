import { FastifyInstance, FastifyRegisterOptions, FastifyReply, FastifyRequest } from 'fastify';

export default function (fastify: FastifyInstance, opts: FastifyRegisterOptions<{}>, done: Function) {
    fastify.post('/', (request: FastifyRequest, reply: FastifyReply) => {});

    done();
}

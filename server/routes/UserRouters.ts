import { FastifyInstance, FastifyRegisterOptions } from 'fastify';

export default function (fastify: FastifyInstance, opts: FastifyRegisterOptions<{}>, done: Function) {
    fastify.post('/', () => {});

    done();
}

import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from './AbstractBaseController';

export class CreateUserController extends BaseController {
    protected async executeImpl(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            // ... Handle request by creating objects
        } catch (err) {
            return this.fail(reply, err.toString())
        }
    }
}

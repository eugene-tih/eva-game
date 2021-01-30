import { FastifyReply, FastifyRequest } from 'fastify';

export abstract class BaseController {

    protected abstract executeImpl(request: FastifyRequest, reply: FastifyReply): Promise<void | any>;

    public async execute(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            await this.executeImpl(request, reply);
        } catch (err) {
            // console.log(`[BaseController]: Uncaught controller error`);
            // console.log(err);
            this.fail(reply, 'An unexpected error occurred')
        }
    }

    public static jsonResponse(reply: FastifyReply, code: number, message: string) {
        return reply.status(code).json({message})
    }

    public ok<T>(reply: FastifyReply, dto?: T) {
        if (!!dto) {
            reply.type('application/json');
            return reply.status(200).json(dto);
        } else {
            return reply.sendStatus(200);
        }
    }

    public created(reply: FastifyReply) {
        return reply.sendStatus(201);
    }

    public clientError(reply: FastifyReply, message?: string) {
        return BaseController.jsonResponse(reply, 400, message ? message : 'Unauthorized');
    }

    public unauthorized(reply: FastifyReply, message?: string) {
        return BaseController.jsonResponse(reply, 401, message ? message : 'Unauthorized');
    }

    public paymentRequired(reply: FastifyReply, message?: string) {
        return BaseController.jsonResponse(reply, 402, message ? message : 'Payment required');
    }

    public forbidden(reply: FastifyReply, message?: string) {
        return BaseController.jsonResponse(reply, 403, message ? message : 'Forbidden');
    }

    public notFound(reply: FastifyReply, message?: string) {
        return BaseController.jsonResponse(reply, 404, message ? message : 'Not found');
    }

    public conflict(reply: FastifyReply, message?: string) {
        return BaseController.jsonResponse(reply, 409, message ? message : 'Conflict');
    }

    public tooMany(reply: FastifyReply, message?: string) {
        return BaseController.jsonResponse(reply, 429, message ? message : 'Too many requests');
    }

    public todo(reply: FastifyReply) {
        return BaseController.jsonResponse(reply, 400, 'TODO');
    }

    public fail(reply: FastifyReply, error: Error | string) {
        console.log(error);
        return reply.status(500).json({
            message: error.toString()
        })
    }
}

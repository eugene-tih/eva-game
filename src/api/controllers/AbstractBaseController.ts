import { IRequest, IReply } from '../interfaces/requestReply';

export abstract class BaseController {

    protected abstract executeImpl(request: IRequest, reply: IReply): Promise<void | any>;

    public async execute(request: IRequest, reply: IReply): Promise<void> {
        try {
            await this.executeImpl(request, reply);
        } catch (err) {
            // @TODO: Should write error to specific log file
            // console.log(`[BaseController]: Uncaught controller error`);
            // console.log(err);
            this.fail(reply, new Error('An unexpected error occurred'))
        }
    }

    public static jsonResponse(reply: IReply, code: number, payload: object) {
        return reply.status(code).send(payload);
    }

    public ok<T>(reply: IReply, dto?: T) {
        if (!!dto) {
            return reply.type('application/json').status(200).send(dto);
        } else {
            return reply.status(200);
        }
    }

    public created(reply: IReply) {
        return reply.status(201);
    }

    public clientError(reply: IReply, error?: Error) {
        return BaseController.jsonResponse(reply, 400, error ? error : { message: 'Bad Request' });
    }

    public unauthorized(reply: IReply, error?: Error) {
        return BaseController.jsonResponse(reply, 401, error ? error : { message: 'Unauthorized' });
    }

    public paymentRequired(reply: IReply, error?: Error) {
        return BaseController.jsonResponse(reply, 402, error ? error : { message: 'Payment required' });
    }

    public forbidden(reply: IReply, error?: Error) {
        return BaseController.jsonResponse(reply, 403, error ? error : { message: 'Forbidden' });
    }

    public notFound(reply: IReply, error?: Error) {
        return BaseController.jsonResponse(reply, 404, error ? error : { message: 'Not found' });
    }

    public conflict(reply: IReply, error?: Error) {
        return BaseController.jsonResponse(reply, 409, error ? error : { message: 'Conflict' });
    }

    public unprocessable(reply: IReply, error?: Error) {
        return BaseController.jsonResponse(reply, 422, error ? error : { message: 'Unprocessable entity' })
    }

    public tooMany(reply: IReply, error?: Error) {
        return BaseController.jsonResponse(reply, 429, error ? error : { message: 'Too many requests' });
    }

    public todo(reply: IReply) {
        return BaseController.jsonResponse(reply, 400, { message: 'TODO' });
    }

    public fail(reply: IReply, error: Error) {
        console.log(error);
        return reply.status(500).send({
            message: error.toString()
        });
    }
}

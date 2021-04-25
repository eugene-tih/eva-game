import { BaseController } from './AbstractBaseController';
import { IReply, IRequest } from '../interfaces/requestReply';
import { INewUser } from '../../core/interfaces/IUser';
import { CreateUserUseCase } from '../../core/useCases/UserUseCase';

export class CreateUserController extends BaseController {
    private _useCase: CreateUserUseCase;

    public constructor(useCase: CreateUserUseCase) {
        super();
        this._useCase = useCase;
    }

    protected async executeImpl(request: IRequest, reply: IReply): Promise<void> {
        const dto = (request.body as { user: INewUser }).user;
        const result = await this._useCase.execute(dto);

        if (result.isLeft()) {
            return this.unprocessable(reply, result.value.errorValue());
        }

        return this.ok(reply);
    }
}

import { Result } from '../Result';
import { Either, left, right } from '../Either';

import { UserGuard } from '../guards/UserGuard';
import { ErrorList } from '../errors/ErrorList';

import { INewUser } from '../interfaces/IUser';
import { IUseCase } from '../interfaces/IUseCase';
import { IUserRepository } from '../interfaces/IUserRepository';

type Response = Either<Result<number>, Result<void>>;

export class CreateUserUseCase implements IUseCase<INewUser, Response> {
    private _userRepository: IUserRepository;

    public constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async execute(request: INewUser): Promise<Response> {
        const { error, value } = UserGuard.validateNewUser(request);
        if (error) {
            return left(Result.fail(ErrorList.User.IncorrectLoginData));
        }

        await this._userRepository.createUser(value);
        return right(Result.ok());
    }
}

import { CreateUserController } from './UserController';
import { CreateUserUseCase } from '../../core/useCases/UserUseCase';
import { UserRepositoryPG } from '../../core/repositories/UserRepositoryPG';

export const createUserController = new CreateUserController(
    new CreateUserUseCase(new UserRepositoryPG())
);

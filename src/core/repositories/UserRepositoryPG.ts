import Knex from 'knex';
import { INewUser } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';

export class UserRepositoryPG implements IUserRepository {
    createUser(user: INewUser): Promise<void> {
        return Knex('users').insert(user);
    }
}

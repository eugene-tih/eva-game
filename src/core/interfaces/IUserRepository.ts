import { INewUser } from './IUser';

export interface IUserRepository {
    createUser(user: INewUser): Promise<void>;
}

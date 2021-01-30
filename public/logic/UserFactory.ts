import { IUser } from './IUser';

class UserFactory {
    createUser(): IUser {
        return new User();
    }
}

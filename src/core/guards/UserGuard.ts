import Joi from 'joi';
import { INewUser } from '../interfaces/IUser';

const options = {};

const newUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).alphanum(),
    password: Joi.string().min(8).max(50),
});

export class UserGuard {
    public static validateNewUser(user: INewUser) {
        return newUserSchema.validate(user, options);
    }
}

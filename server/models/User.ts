import { Model } from 'objection';

export default class User extends Model {
    id!: number;
    static tableName = 'user';
}

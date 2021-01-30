import { Model } from 'objection';

export default class Session extends Model {
    id!: number;
    static tableName = 'session';
}

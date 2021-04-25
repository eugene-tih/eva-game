// import { WError } from './errors/WError';
// import { IWError } from './interfaces/IWError';

export class Result<T> {
    public isSuccess: boolean;
    public isFailure: boolean
    private _error: T | string;
    private _value: T;

    public constructor (isSuccess: boolean, error?: T | string | null, value?: T) {
        if (isSuccess && error) {
            throw new Error(`InvalidOperation: A result cannot be successful and contain an error.`);
        }
        if (!isSuccess && !error) {
            throw new Error(`InvalidOperation: A failing result needs to contain an error message.`);
        }

        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this._error = error as T;
        this._value = value as T;
    }

    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error(`Can't get the value of an error result. Use 'errorValue' instead.`)
        }

        return this._value;
    }

    public errorValue(): T {
        return this._error as T;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, null, value);
    }

    public static fail<U>(error: string): Result<U> {
        return new Result<U>(false, error);
    }
}

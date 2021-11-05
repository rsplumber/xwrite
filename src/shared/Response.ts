export class Response {

    private _success: boolean;
    private _message: string;
    private _data: Map<string, any> = new Map<string, any>();


    constructor(success: boolean) {
        this._success = success;
    }

    get success(): boolean {
        return this._success;
    }

    set success(value: boolean) {
        this._success = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }

    public attachData(key, value): Response {
        this.data.set(key, value);
        return this;
    }

    public getValue(key: string): any {
        return this.data.get(key);
    }
}
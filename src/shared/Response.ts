export class Response {

    private _type: string;
    private _success : boolean;
    private _message: string;
    private _data : any;


    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
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
}
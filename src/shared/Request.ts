export class Request {

    private _type;
    private _commandIdentifier : string;
    private _data : Map<string, any> = new Map<string, any>();

    constructor(commandIdentifier: string) {
        this._commandIdentifier = commandIdentifier;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get commandIdentifier(): string {
        return this._commandIdentifier;
    }

    set commandIdentifier(value: string) {
        this._commandIdentifier = value;
    }

    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }

    public attachToData(key , value) : Request{
        this.data.set(key , value);
        return this;
    }
}
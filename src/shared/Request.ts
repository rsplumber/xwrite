export class Request {

    private _canceled: boolean = false;
    private _type;
    private readonly _commandIdentifier: string;
    private _data: Map<string, any> = new Map<string, any>();

    constructor(command: string) {
        this._commandIdentifier = command;
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


    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }


    get canceled(): boolean {
        return this._canceled;
    }

    set canceled(value: boolean) {
        this._canceled = value;
    }

    public attachToData(key, value): Request {
        this.data.set(key, value);
        return this;
    }

    public getFromData(key: string): any {
        return this.data.get(key) ?? {};
    }
}
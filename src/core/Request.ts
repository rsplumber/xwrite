export class Request {

    private readonly _commandIdentifier: string;

    private constructor(command: string) {
        this._commandIdentifier = command;
    }

    private _canceled: boolean = false;

    get canceled(): boolean {
        return this._canceled;
    }

    set canceled(value: boolean) {
        this._canceled = value;
    }

    private _type;

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    private _data: Map<string, any> = new Map<string, any>();

    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }

    get commandIdentifier(): string {
        return this._commandIdentifier;
    }

    public static generate(command: string): Request {
        return new Request(command);
    }

    public attachToData(key: string, value: any): Request {
        this.data.set(key, value);
        return this;
    }

    public findInPage(searchFor: string = null): Request {
        this.attachToData("findInPage", true);
        if (searchFor) {
            this.attachToData("searchFor", searchFor);
        }
        return this;
    }

    public getFromData(key: string): any {
        const data = this.getData();
        if (data) {
            return data[key] ?? false;
        }
        return false;
    }

    public getData(): any {
        return this.data.get("data") ?? false;
    }
}
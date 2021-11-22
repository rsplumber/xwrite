export class Request {

    private readonly _commandIdentifier: string;
    private _data: Map<string, any> = new Map<string, any>();
    private _canceled: boolean = false;
    private _type;

    private constructor(command: string) {
        this._commandIdentifier = command;
    }

    get canceled(): boolean {
        return this._canceled;
    }

    set canceled(value: boolean) {
        this._canceled = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

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
        return this.data.get(key) ?? false;
    }

    public getFromViewData(key: string): any {
        const data = this.getViewsData();
        if (data) {
            return data[key] ?? false;
        }
        return false;
    }

    public getViewsData(): any {
        return this.getFromData("viewsData") ?? false;
    }
}
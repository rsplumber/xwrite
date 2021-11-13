import {Context} from "./Context";

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

    public attachData(key: string, value: any): Response {
        this.data.set(key, value);
        return this;
    }

    public getFromData(key: string): any {
        return this.data.get(key);
    }

    public static generator(success: boolean = true): ResponseGenerator {
        return new ResponseGenerator(success);
    }
}

export class ResponseGenerator {

    private readonly response: Response;

    constructor(success: boolean) {
        this.response = new Response(success);
    }

    public setNotificationMessage(message: string): ResponseGenerator {
        this.response.attachData("notificationMessage", message);
        return this;
    }

    public setMessageCenterText(message: string): ResponseGenerator {
        this.response.attachData("messageCenterType", "message_center");
        this.response.attachData("messageCenter", message);
        return this;
    }

    public softRefreshData(delay: number = 0, searchFor: string = null, keepCurrentState: boolean = false): ResponseGenerator {
        this.refreshData(delay, searchFor);
        if (keepCurrentState) {
            this.response.attachData("keepCurrentState", true);
        }
        return this;
    }

    public hardRefreshData(delay: number = 0, searchFor: string = null): ResponseGenerator {
        this.refreshData(delay, searchFor);
        this.response.attachData("hardRefresh", true);
        return this;
    }

    private refreshData(delay: number = 0, searchFor: string = null): ResponseGenerator {
        this.response.attachData("refreshData", true);
        if (delay > 0) {
            this.response.attachData("refreshDataDelay", delay);
        }
        if (searchFor) {
            this.response.attachData("searchFor", searchFor);
        }
        return this;
    }


    public addEventOnUi(type: string, data): ResponseGenerator {
        if (!this.response.getFromData("ui_events")) {
            this.response.attachData("ui_events", new Map<string, any>());
        }
        this.response.getFromData("ui_events").set(type, data);
        return this;
    }

    public generate(): Response {
        this.response.attachData("debug_mode", Context.getInstance().isDebugMode());
        return this.response;
    }
}
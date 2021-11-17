import {Settings} from "./Settings";

export class Response {

    constructor(success: boolean) {
        this._success = success;
    }

    private _success: boolean;

    get success(): boolean {
        return this._success;
    }

    set success(value: boolean) {
        this._success = value;
    }

    private _message: string;

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    private _data: Map<string, any> = new Map<string, any>();

    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }

    public static generator(success: boolean = true): ResponseGenerator {
        return new ResponseGenerator(success);
    }

    public attachData(key: string, value: any): Response {
        this.data.set(key, value);
        return this;
    }

    public getFromData(key: string): any {
        return this.data.get(key);
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

    public softRefreshData(props?: { delay?: number, searchFor?: string, keepCurrentState?: boolean }): ResponseGenerator {
        this.refreshData(props.delay, props.searchFor);
        if (props.keepCurrentState) {
            this.response.attachData("keepCurrentState", true);
        }
        return this;
    }

    public hardRefreshData(props?: { delay?: number, searchFor?: string }): ResponseGenerator {
        this.refreshData(props.delay, props.searchFor);
        this.response.attachData("hardRefresh", true);
        return this;
    }

    public addEventOnUi(type: string, data): ResponseGenerator {
        if (!this.response.getFromData("ui_events")) {
            this.response.attachData("ui_events", new Map<string, any>());
        }
        this.response.getFromData("ui_events").set(type, data);
        return this;
    }

    public refreshDataOnView(data): ResponseGenerator {
        return this.addEventOnUi("detect_texts", data);
    }

    public generate(): Response {
        this.response.attachData("debugMode", Settings.isDebugMode);
        return this.response;
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
}
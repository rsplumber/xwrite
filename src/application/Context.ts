import {IFilter} from "./filters/abstractions/IFilter";
import {IReplacer} from "./commands/replacer/IReplacer";
import {ReplacersContainer} from "./containers/replacers/ReplacersContainer";
import {CommandsContainer} from "./containers/commands/CommandsContainer";
import {TextNodesContainer} from "./containers/nodes/TextNodesContainer";
import {Response} from "../shared/Response";
import {Request} from "../shared/Request";
import {AbstractFilter} from "./filters/abstractions/AbstractFilter";
import {AbstractCommand} from "./commands/abstractions/AbstractCommand";

export class Context {

    static _debug: boolean;

    static requestChainFilter: IFilter;

    static response: Response;

    public static builder(): ContextBuilder {
        return new ContextBuilder();
    }

    public static getRequestChainFilter(): IFilter {
        return this.requestChainFilter;
    }

    public static getTextNodesContainer(): TextNodesContainer {
        return TextNodesContainer.getInstance();
    }

    public static getCommandsContainer(): CommandsContainer {
        return CommandsContainer.getInstance();
    }

    public static getReplacersContainer(): ReplacersContainer {
        return ReplacersContainer.getInstance();
    }

    public static isDebugMode(): boolean {
        return this._debug;
    }

    public static generateRequest(commandIdentifier: string): Request {
        return new Request(commandIdentifier);
    }

    public static currentResponse(): Response {
        return this.response;
    }

    public static responseGenerator(): ResponseGenerator {
        return new ResponseGenerator();
    }

}

export class ContextBuilder {
    public initializeFilters(filters: AbstractFilter[]): ContextBuilder {
        filters.sort(a => a.order());
        Context.requestChainFilter = filters[0];
        filters.slice(1).forEach(value => Context.requestChainFilter.setNext(value));
        return this;
    }

    public initializeCommands(commands: AbstractCommand[]): ContextBuilder {
        CommandsContainer.getInstance().addRange(commands);
        return this;
    }

    public initializeReplacers(replacers: IReplacer[]): ContextBuilder {
        ReplacersContainer.getInstance().addRange(replacers);
        return this;
    }

    public build(debugMode: boolean = false) {
        Context._debug = debugMode;
    }
}

export class ResponseGenerator {


    constructor() {
        Context.response = new Response();
    }

    public setNotificationMessage(message: string): ResponseGenerator {
        Context.response.attachToData("notificationMessage", message);
        return this;
    }

    public setMessageCenterText(message: string): ResponseGenerator {
        Context.response.attachToData("messageCenterType", "message_center");
        Context.response.attachToData("messageCenter", message);
        return this;
    }

    public refreshData(): ResponseGenerator {
        Context.response.attachToData("prepareData", true);
        return this;
    }

    public eventOnUi(type: string, data): ResponseGenerator {
        Context.response.attachToData("type", type);
        Context.response.attachToData("data", data);
        return this;
    }

    public generate(): Response {
        Context.response.attachToData("debug_mode", Context.isDebugMode());
        return Context.response;
    }
}
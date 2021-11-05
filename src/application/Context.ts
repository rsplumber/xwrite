import {IFilter} from "./filters/abstractions/IFilter";
import {AbstractReplacer} from "./commands/replacer/AbstractReplacer";
import {ReplacersContainer} from "./containers/replacers/ReplacersContainer";
import {CommandsContainer} from "./containers/commands/CommandsContainer";
import {TextNodesContainer} from "./containers/nodes/TextNodesContainer";
import {Response} from "../shared/Response";
import {Request} from "../shared/Request";
import {AbstractFilter} from "./filters/abstractions/AbstractFilter";
import {AbstractCommand} from "./commands/abstractions/AbstractCommand";
import {ReflectionHelper} from "./helpers/ReflectionHelper";

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

    public static generateRequest(command): Request {
        return new Request(command);
    }

    public static currentResponse(): Response {
        return this.response;
    }

    public static responseGenerator(): ResponseGenerator {
        return new ResponseGenerator();
    }

}

export class ContextBuilder {

    constructor() {
        this.initCommands();
        this.initFilters();
        this.initReplacers();
    }


    private initCommands() {
        const commands = new Array<AbstractCommand>();
        this.createSubClassesFor(AbstractCommand)
            .forEach(value => commands.push(value));
        CommandsContainer.getInstance().addRange(commands);
    }


    private initFilters() {
        const filters = new Array<AbstractFilter>();
        this.createSubClassesFor(AbstractFilter)
            .forEach(value => filters.push(value));
        filters.filter(value => !value.disabled())
            .sort(a => a.order());

        Context.requestChainFilter = filters[0];
        for (let i = 1; i < filters.length; i++) {
            if (i < filters.length - 1) {
                filters[i].setNext(filters[i + 1]);
            }
        }
    }

    private initReplacers() {
        const replacers = new Array<AbstractReplacer>();
        this.createSubClassesFor(AbstractReplacer)
            .forEach(value => replacers.push(value));
        ReplacersContainer.getInstance().addRange(replacers);
    }


    public build(debugMode: boolean = false) {
        Context._debug = debugMode;
    }

    private createSubClassesFor(baseClass) {
        const classes = [];
        ReflectionHelper.getSubclasses(baseClass)
            .forEach(value => {
                classes.push(ReflectionHelper.createInstance(value, null));
            });
        return classes;
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
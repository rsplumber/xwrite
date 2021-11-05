import {IFilter} from "./filters/abstractions/IFilter";
import {AbstractReplacer} from "./commands/replacer/AbstractReplacer";
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
    private filters: AbstractFilter[];
    private commands: AbstractCommand[];

    constructor() {
        this.initCommands();
        this.initFilters();
        this.initReplacers();
    }


    private initCommands() {
        this.commands = new Array<AbstractCommand>();
        this.getAllSubclasses(AbstractCommand)
            .forEach(value => {
                const newInstance = Object.create(window[value].prototype);
                newInstance.constructor.apply(newInstance, null);
                this.commands.push((newInstance));
            });
        CommandsContainer.getInstance().addRange(this.commands);
    }

    private getAllSubclasses(baseClass) {
        const globalObject = Function('return this')();
        const allVars = Object.keys(globalObject);
        return allVars.filter(function (key) {
            try {
                const obj = globalObject[key];
                return obj.prototype instanceof baseClass;
            } catch (e) {
                return null;
            }
        });
    }


    private initFilters() {
        this.filters = new Array<AbstractFilter>();
        this.getAllSubclasses(AbstractFilter)
            .forEach(value => {
                const newInstance = Object.create(window[value].prototype);
                newInstance.constructor.apply(newInstance, null);
                this.filters.push((newInstance));
            })


        this.filters.filter(value => !value.disabled())
            .sort(a => a.order());

        Context.requestChainFilter = this.filters[0];
        for (let i = 1; i < this.filters.length; i++) {
            if (i < this.filters.length - 1) {
                this.filters[i].setNext(this.filters[i + 1]);
            }
        }
    }

    private initReplacers() {
        this.getAllSubclasses(AbstractReplacer)
            .forEach(value => {
                const newInstance = Object.create(window[value].prototype);
                newInstance.constructor.apply(newInstance, null);
                this.filters.push((newInstance));
            })
        ReplacersContainer.getInstance().addRange(replacers);
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
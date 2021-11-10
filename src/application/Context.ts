import {IFilter} from "./filters/abstractions/IFilter";
import {AbstractReplacer} from "./replacers/abstractions/AbstractReplacer";
import {ReplacersContainer} from "./containers/ReplacersContainer";
import {CommandsContainer} from "./containers/CommandsContainer";
import {TextNodesContainer} from "./containers/TextNodesContainer";
import {Response} from "../shared/Response";
import {Request} from "../shared/Request";
import {AbstractFilter} from "./filters/abstractions/AbstractFilter";
import {AbstractCommand} from "./commands/abstractions/AbstractCommand";
import {ReflectionHelper} from "./helpers/ReflectionHelper";
import {RequestExecutor} from "./RequestExecutor";
import {ReplaceAllReplacer} from "./replacers/ReplaceAllReplacer";
import {StandardReplaceReplacer} from "./replacers/StandardReplaceReplacer";
import {JustifiersContainer} from "./containers/JustifiersContainer";
import {LTRWordJustify} from "./justifiers/LTRWordJustify";

export class Context {

    private _debug: boolean;

    private _requestChainFilter: IFilter;

    private response: Response;

    static statistics: Map<string, any>;

    static instance: Context;


    public static builder(): ContextBuilder {
        return new ContextBuilder();
    }

    public static getInstance(): Context {
        return Context.instance;
    }

    public getRequestChainFilter(): IFilter {
        return this._requestChainFilter;
    }


    set requestChainFilter(value: IFilter) {
        this._requestChainFilter = value;
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

    public static getJustifierContainer(): JustifiersContainer {
        return JustifiersContainer.getInstance();
    }

    public isDebugMode(): boolean {
        return this._debug;
    }


    set debug(value: boolean) {
        this._debug = value;
    }

    public static generateRequest(command: string): Request {
        return new Request(command);
    }

    public static async executeRequestAsync(request: Request): Promise<void> {
        await RequestExecutor.executeAsync(request);
    }

    public currentResponse(): Response {
        return this.response;
    }

    public attachResponse(response: Response): void {
        this.response = response;
    }

    public static currentResponse(): Response {
        return Context.getInstance().currentResponse();
    }

    public static responseGenerator(success: boolean): ResponseGenerator {
        return new ResponseGenerator(success);
    }

}

export class ContextBuilder {

    private readonly commands: Array<AbstractCommand>;
    private readonly filters: Array<AbstractFilter>;

    constructor() {
        this.commands = new Array<AbstractCommand>();
        this.filters = new Array<AbstractFilter>();
    }

    private autoInitCommands() {
        const commands = new Array<AbstractCommand>();
        ReflectionHelper.createSubClassesFor(AbstractCommand)
            .forEach(value => commands.push(value));
        CommandsContainer.getInstance().addRange(commands);
    }

    private autoInitFilters() {

        const filters = new Array<AbstractFilter>();
        ReflectionHelper.createSubClassesFor(AbstractFilter)
            .forEach(value => filters.push(value));
        const organizedFilters = filters.filter(value => !value.disabled())
            .sort(a => a.order());

        Context.getInstance().requestChainFilter = organizedFilters[0];
        for (let i = 1; i < organizedFilters.length; i++) {
            if (i < organizedFilters.length - 1) {
                organizedFilters[i].setNext(organizedFilters[i + 1]);
            }
        }
    }

    private autoInitReplacers() {
        const replacers = new Array<AbstractReplacer>();
        ReflectionHelper.createSubClassesFor(AbstractReplacer)
            .forEach(value => replacers.push(value));
        ReplacersContainer.getInstance().addRange(replacers);
    }

    private static initReplacers() {
        ReplacersContainer.getInstance().addRange([
            new ReplaceAllReplacer(),
            new StandardReplaceReplacer()
        ]);
    }

    private static initJustifiers() {
        JustifiersContainer.getInstance().addRange([
            new LTRWordJustify()
        ]);
    }

    public addCommands(commands: AbstractCommand[]): ContextBuilder {
        commands.forEach(value => this.commands.push(value));
        return this;
    }

    private initCommands() {
        CommandsContainer.getInstance().addRange(this.commands)
    }

    public addFilters(filters: AbstractFilter[]): ContextBuilder {
        filters.forEach(value => this.filters.push(value));
        return this;
    }

    private initFilters() {
        const organizedFilters = this.filters;
        // .filter(value => !value.disabled())
        // .sort(a => a.order());
        Context.getInstance().requestChainFilter = organizedFilters[0];
        for (let i = 0; i < organizedFilters.length; i++) {
            if (i < organizedFilters.length - 1) {
                organizedFilters[i].setNext(organizedFilters[i + 1]);
            }
        }
    }

    public build(debugMode: boolean = false) {
        Context.instance = new Context();
        this.initFilters();
        this.initCommands();
        ContextBuilder.initReplacers();
        ContextBuilder.initJustifiers();
        Context.getInstance().debug = debugMode;
    }

}

export class ResponseGenerator {

    constructor(success: boolean) {
        Context.getInstance().attachResponse(new Response(success));
    }

    public setNotificationMessage(message: string): ResponseGenerator {
        Context.currentResponse().attachData("notificationMessage", message);
        return this;
    }

    public setMessageCenterText(message: string): ResponseGenerator {
        Context.currentResponse().attachData("messageCenterType", "message_center");
        Context.currentResponse().attachData("messageCenter", message);
        return this;
    }

    public refreshData(delay: number = 0): ResponseGenerator {
        Context.currentResponse().attachData("refreshData", true);
        if (delay > 0) {
            Context.currentResponse().attachData("refreshDataDelay", delay);
        }
        return this;
    }

    public addEventOnUi(type: string, data): ResponseGenerator {
        if (!Context.currentResponse().getFromData("ui_events")) {
            Context.currentResponse().attachData("ui_events", new Map<string, any>());
        }
        Context.currentResponse().getFromData("ui_events").set(type, data);
        return this;
    }

    public generate(): Response {
        Context.currentResponse().attachData("debug_mode", Context.getInstance().isDebugMode());
        return Context.currentResponse();
    }
}
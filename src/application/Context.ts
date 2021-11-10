import {IFilter} from "./filters/abstractions/IFilter";
import {AbstractReplacer} from "./replacers/abstractions/AbstractReplacer";
import {ReplacersContainer} from "./containers/ReplacersContainer";
import {CommandsContainer} from "./containers/CommandsContainer";
import {TextNodesContainer} from "./containers/TextNodesContainer";
import {Request} from "../shared/Request";
import {AbstractFilter} from "./filters/abstractions/AbstractFilter";
import {AbstractCommand} from "./commands/abstractions/AbstractCommand";
import {ReflectionHelper} from "./helpers/ReflectionHelper";
import {RequestExecutor} from "./RequestExecutor";
import {ReplaceAllReplacer} from "./replacers/ReplaceAllReplacer";
import {StandardReplaceReplacer} from "./replacers/StandardReplaceReplacer";
import {JustifiersContainer} from "./containers/JustifiersContainer";
import {SpaceJustify} from "./justifiers/SpaceJustify";

export class Context {

    private _debug: boolean;

    private _requestChainFilter: IFilter;

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

    public static async executeRequestAsync(request: Request): Promise<void> {
        await RequestExecutor.executeAsync(request);
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
            new SpaceJustify()
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
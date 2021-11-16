import {IFilter} from "./abstractions/filters/IFilter";
import {TextNodesContainer} from "./containers/TextNodesContainer";
import {Request} from "./Request";
import {AbstractFilter} from "./abstractions/filters/AbstractFilter";
import {ICommand} from "./abstractions/commands/ICommand";
import {RequestExecutor} from "./executors/RequestExecutor";
import {Response} from "./Response";
import {RequestFilterChain} from "./RequestFilterChain";

export class Context {

    private _debug: boolean;

    static instance: Context;

    public static builder(): ContextBuilder {
        return new ContextBuilder();
    }

    public static getInstance(): Context {
        return Context.instance;
    }

    public getRequestChainFilter(): IFilter {
        return RequestFilterChain.chain();
    }

    public static getTextNodesContainer(): TextNodesContainer {
        return TextNodesContainer.getInstance();
    }

    public isDebugMode(): boolean {
        return this._debug;
    }


    set debug(value: boolean) {
        this._debug = value;
    }

    public static isDebugMode(): boolean {
        return this.getInstance().isDebugMode();
    }

    public static async executeRequestInPipelineAsync(request: Request): Promise<void> {
        await RequestExecutor.executeInPipelineAsync(request);
    }

    public static async executeRequestAsync(request: Request): Promise<Response> {
        return await RequestExecutor.executeAsync(request);
    }

}

export class ContextBuilder {

    private readonly commands: Array<ICommand>;

    constructor() {
        this.commands = new Array<ICommand>();
    }

    public addCommands(commands: ICommand[]): ContextBuilder {
        commands.forEach(value => this.commands.push(value));
        return this;
    }

    public addFilters(filters: AbstractFilter[]): ContextBuilder {
        RequestFilterChain.initChain(filters);
        return this;
    }

    public build(debugMode: boolean = false) {
        Context.instance = new Context();
        Context.getInstance().debug = debugMode;
    }

}
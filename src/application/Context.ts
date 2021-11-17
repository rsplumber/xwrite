import {IFilter} from "./abstractions/filters/IFilter";
import {TextNodesContainer} from "./containers/TextNodesContainer";
import {Request} from "./Request";
import {AbstractFilter} from "./abstractions/filters/AbstractFilter";
import {RequestExecutor} from "./executors/RequestExecutor";
import {Response} from "./Response";
import {RequestFilterChain} from "./RequestFilterChain";
import {DependencyType, Resolver} from "./Resolver";
import {AbstractContainer} from "./abstractions/containers/AbstractContainer";
import {TextNodeData} from "../shared/TextNodeData";

export class Context {

    private _debug: boolean;

    static instance: Context;

    public static builder(): ContextBuilder {
        return new ContextBuilder();
    }

    public static getInstance(): Context {
        return Context.instance;
    }

    public static getRequestChainFilter(): IFilter {
        return RequestFilterChain.chain();
    }

    public static getTextNodesContainer(): AbstractContainer<TextNodeData> {
        return TextNodesContainer.getInstance();
    }

    public static resolve<Type extends object>(key: string): Type {
        return Resolver.resolve<Type>(key) as Type;
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


    public registerDependencies(dependencies: { key: string, register, registerType?: DependencyType }[]): ContextBuilder {
        dependencies.forEach(value => {
            this.registerDependency(value.key, value.register, value.registerType);
        });
        return this;
    }

    public registerDependency(key: string, register, registerType: DependencyType = DependencyType.Singleton): ContextBuilder {
        Resolver.getInstance().register(key, register, registerType);
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
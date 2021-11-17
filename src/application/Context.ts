import {IFilter} from "../core/abstractions/filters/IFilter";
import {TextNodesContainer} from "./containers/TextNodesContainer";
import {Request} from "../core/Request";
import {AbstractFilter} from "../core/abstractions/filters/AbstractFilter";
import {RequestExecutor} from "../core/executors/RequestExecutor";
import {Response} from "../core/Response";
import {RequestFilterChain} from "../core/RequestFilterChain";
import {DependencyResolver} from "../core/ioc/DependencyResolver";
import {AbstractContainer} from "../core/abstractions/containers/AbstractContainer";
import {TextNodeData} from "../shared/TextNodeData";
import {Settings} from "../core/Settings";
import {DependencyType} from "../core/ioc/DependencyType";

export class Context {

    static instance: Context;

    set debug(value: boolean) {
        Settings.isDebugMode = value;
    }

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
        return DependencyResolver.resolve<Type>(key) as Type;
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

    public isDebugMode(): boolean {
        return Settings.isDebugMode;
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
        DependencyResolver.getInstance().register(key, register, registerType);
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
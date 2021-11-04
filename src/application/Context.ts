import {IFilter} from "./filters/abstraction/IFilter";
import {ICommand} from "./commands/abstraction/ICommand";
import {IReplacer} from "./commands/replacer/IReplacer";
import {ReplacersContainer} from "./containers/replacers/ReplacersContainer";
import {CommandsContainer} from "./containers/commands/CommandsContainer";
import {TextNodesContainer} from "./containers/nodes/TextNodesContainer";

export class Context {

    static _debug: boolean;

    static requestChainFilter: IFilter;

    public static builder() : ContextBuilder {
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

}

export class ContextBuilder {
    public initializeFilters(filters: IFilter[]): ContextBuilder {
        Context.requestChainFilter = filters[0];
        filters.slice(1).forEach(value => Context.requestChainFilter.setNext(value));
        return this;
    }

    public initializeCommands(commands: ICommand[]): ContextBuilder {
        CommandsContainer.getInstance().addRange(commands);
        return this;
    }

    public initializeReplacers(replacers: IReplacer[]): ContextBuilder {
        ReplacersContainer.getInstance().addRange(replacers);
        return this;
    }

    public build(debugMode: boolean = false){
        Context._debug = debugMode;
    }
}
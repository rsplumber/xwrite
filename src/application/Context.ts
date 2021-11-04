import {IFilter} from "./filters/abstraction/IFilter";
import {ICommand} from "./commands/abstraction/ICommand";
import {IReplacer} from "./commands/replacer/IReplacer";
import {ReplacersContainer} from "./containers/replacers/ReplacersContainer";
import {CommandsContainer} from "./containers/commands/CommandsContainer";
import {TextNodesContainer} from "./containers/nodes/TextNodesContainer";

export class Context {

    private _debug: boolean;

    private static requestChainFilter: IFilter;

    public initializeFilters(filters: IFilter[]): Context {
        Context.requestChainFilter = filters[0];
        filters.slice(1).forEach(value => Context.requestChainFilter.setNext(value));
        return this;
    }

    public initializeCommands(commands: ICommand[]): Context {
        CommandsContainer.getInstance().addRange(commands);
        return this;
    }

    public initializeReplacers(replacers: IReplacer[]): Context {
        ReplacersContainer.getInstance().addRange(replacers);
        return this;
    }

    public static getRequestChainFilter(): IFilter {
        return this.requestChainFilter;
    }

    public run(debugMode: boolean = false): Context {
        this._debug = debugMode;
        return this;
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

}
import {BaseContainer} from "../BaseContainer";
import {IReplacer} from "../../commands/replacer/IReplacer";
import {ICommand} from "../../commands/abstraction/ICommand";

export class CommandsContainer extends BaseContainer<ICommand> {

    private static instance: CommandsContainer;

    protected constructor() {
        super();
    }

    public static getInstance(): CommandsContainer {
        if (!CommandsContainer.instance) {
            CommandsContainer.instance = new CommandsContainer();
        }

        return CommandsContainer.instance;
    }

    initItems(): void {
        super.items = new Array<ICommand>();
    }

    getById(id: string): ICommand {
        return super.items.find(value => value.identifier() === id);
    }
}

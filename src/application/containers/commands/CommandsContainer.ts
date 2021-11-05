import {AbstractContainer} from "../abstractions/AbstractContainer";
import {AbstractCommand} from "../../commands/abstractions/AbstractCommand";

export class CommandsContainer extends AbstractContainer<AbstractCommand> {

    private static instance: CommandsContainer;

    protected constructor() {
        super();
        this.initItems();
    }

    public static getInstance(): CommandsContainer {
        if (!CommandsContainer.instance) {
            CommandsContainer.instance = new CommandsContainer();
        }

        return CommandsContainer.instance;
    }

    initItems(): void {
        super.items = new Array<AbstractCommand>();
    }

    getById(id: string): AbstractCommand {
        return super.items.find(value => value.identifier() === id);
    }
}

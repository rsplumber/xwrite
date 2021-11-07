import {AbstractContainer} from "./abstractions/AbstractContainer";
import {AbstractCommand} from "../commands/abstractions/AbstractCommand";

export class CommandsContainer extends AbstractContainer<AbstractCommand> {

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

    getById(id: string): AbstractCommand {
        return this.getAll().find(value => value.identifier() === id);
    }
}

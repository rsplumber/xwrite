import {AbstractContainer} from "./abstractions/AbstractContainer";
import {ICommand} from "../commands/abstractions/ICommand";

export class CommandsContainer extends AbstractContainer<ICommand> {

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
}

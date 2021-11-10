import {Response} from "../../../shared/Response";
import {Context} from "../../Context";
import {Request} from "../../../shared/Request";

export class CommandExecutor {

    private static instance: CommandExecutor;

    private constructor() {
    }

    public static getInstance(): CommandExecutor {
        if (!CommandExecutor.instance) {
            CommandExecutor.instance = new CommandExecutor();
        }

        return CommandExecutor.instance;
    }

    async executeAsync(request: Request): Promise<Response> {
        return Context.getCommandsContainer()
            .getById(request.commandIdentifier)
            .executeAsync(request);
    }

    public static async executeAsync(request: Request): Promise<Response> {
        return await CommandExecutor.getInstance().executeAsync(request);
    }
}
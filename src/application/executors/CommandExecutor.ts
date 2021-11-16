import {Response} from "../Response";
import {Context} from "../Context";
import {Request} from "../Request";
import {Resolver} from "../resolvers/Resolver";

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

    private static async executeRequestAsync(request: Request): Promise<Response> {
        return Resolver.getInstance()
            .resolveCommand(request.commandIdentifier)
            .executeAsync(request);
    }

    public static async executeAsync(request: Request): Promise<Response> {
        CommandExecutor.logRequest(request);
        return await CommandExecutor.executeRequestAsync(request);
    }

    private static logRequest(request: Request) {
        if (!Context.isDebugMode()) return;
        console.log("***********COMMAND**************************");
        console.log("-----------REQUEST--------------------------")
        console.log("request object: " + request);
        console.log("request command: " + request.commandIdentifier);
        console.log("request data: " + JSON.stringify(request.data));
        console.log("request type: " + request.type);
        console.log("--------------------------------------------")
    }
}
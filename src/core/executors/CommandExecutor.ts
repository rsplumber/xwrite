import {Response} from "../Response";
import {Request} from "../Request";
import {DependencyResolver} from "../ioc/DependencyResolver";
import {ICommand} from "../abstractions/commands/ICommand";
import {Settings} from "../Settings";

export class CommandExecutor {

    public static async executeAsync(request: Request): Promise<Response> {
        CommandExecutor.logRequest(request);
        return await CommandExecutor.executeRequestAsync(request);
    }

    private static async executeRequestAsync(request: Request): Promise<Response> {
        return DependencyResolver.resolve<ICommand>(request.commandIdentifier)
            .executeAsync(request);
    }

    private static logRequest(request: Request) {
        if (!Settings.isDebugMode) return;
        console.log("***********COMMAND**************************");
        console.log("-----------REQUEST--------------------------")
        console.log("request object: " + request);
        console.log("request command: " + request.commandIdentifier);
        console.log("request data: " + JSON.stringify(request.data));
        console.log("request type: " + request.type);
        console.log("--------------------------------------------")
    }
}
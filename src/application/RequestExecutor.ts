import {Request} from "./Request";
import {Context} from "./Context";
import {CommandExecutor} from "./commands/abstractions/CommandExecutor";
import {Response} from "./Response";

export class RequestExecutor {
    public static async executeInPipelineAsync(request: Request): Promise<void> {
        await Context.getInstance().getRequestChainFilter().handleAsync(request, null);
    }

    public static async executeAsync(request: Request): Promise<Response> {
        return await CommandExecutor.executeAsync(request);
    }
}
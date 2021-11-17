import {Request} from "../Request";
import {CommandExecutor} from "./CommandExecutor";
import {Response} from "../Response";
import {RequestFilterChain} from "../RequestFilterChain";

export class RequestExecutor {

    public static async executeInPipelineAsync(request: Request): Promise<void> {
        await RequestFilterChain.chain().handleAsync(request, null);
    }

    public static async executeAsync(request: Request): Promise<Response> {
        return await CommandExecutor.executeAsync(request);
    }
}
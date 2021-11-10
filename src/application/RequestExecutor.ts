import {Request} from "../shared/Request";
import {Context} from "./Context";

export class RequestExecutor {
    public static async executeAsync(request: Request): Promise<void> {
        await Context.getInstance().getRequestChainFilter().handleAsync(request, null);
    }
}
import {Request} from "../shared/Request";
import {Context} from "./Context";

export class RequestExecutor {
    public static async execute(request: Request): Promise<void> {
        await Context.getInstance().getRequestChainFilter().handle(request);
    }
}
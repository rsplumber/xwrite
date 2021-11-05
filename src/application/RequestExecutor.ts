import {Request} from "../shared/Request";
import {Context} from "./Context";

export class RequestExecutor {
    public static execute(request: Request): void {
        console.log("request" + request);
        console.log("chain" + Context.getInstance().getRequestChainFilter());

        Context.getInstance().getRequestChainFilter().handle(request);
    }
}
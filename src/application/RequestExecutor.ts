import {Request} from "../shared/Request";
import {Context} from "./Context";

export class RequestExecutor {
    public static execute(request: Request): void {
        Context.getRequestChainFilter().handle(request);
    }
}
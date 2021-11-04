import {Request} from "../shared/Request";
import {Context} from "./Context";
import {Response} from "../shared/Response";

export class RequestExecutor {
    public static execute(request: Request): Response {
        return Context.getRequestChainFilter().handle(request);
    }
}
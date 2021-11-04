import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Response} from "../../shared/Response";
import {CommandExecutor} from "../commands/abstractions/CommandExecutor";
import {Context} from "../Context";

export class PrepareDataFilter extends AbstractFilter {
    public handle(request: Request): Response {
        Context.generateRequest("nodeDetector");
        return super.handle(request);
    }

    order(): number {
        return 0;
    }
}
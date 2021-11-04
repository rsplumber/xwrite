import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Response} from "../../shared/Response";
import {CommandExecutor} from "../commands/abstractions/CommandExecutor";

export class CommandProviderFilter extends AbstractFilter {
    public handle(request: Request): Response {
        CommandExecutor.getInstance().execute(request);
        return super.handle(request);
    }

    order(): number {
        return 0;
    }
}
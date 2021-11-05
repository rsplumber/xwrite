import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {CommandExecutor} from "../commands/abstractions/CommandExecutor";

export class CommandProviderFilter extends AbstractFilter {
    public handle(request: Request): void {
        CommandExecutor.getInstance().execute(request);
        super.handle(request);
    }

    order(): number {
        return 0;
    }
}
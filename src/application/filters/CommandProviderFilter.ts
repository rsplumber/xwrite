import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {CommandExecutor} from "../commands/abstractions/CommandExecutor";

export class CommandProviderFilter extends AbstractFilter {
    public async handleAsync(request: Request): Promise<void> {
        await CommandExecutor.executeAsync(request);
        await super.handleAsync(request);
    }

    order(): number {
        return 0;
    }
}
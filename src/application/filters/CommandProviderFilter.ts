import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {CommandExecutor} from "../commands/abstractions/CommandExecutor";

export class CommandProviderFilter extends AbstractFilter {
    public async handleAsync(request: Request): Promise<void> {
        console.log("command:" + request.commandIdentifier);
        await CommandExecutor.getInstance().executeAsync(request);
        await super.handleAsync(request);
    }

    order(): number {
        return 0;
    }
}
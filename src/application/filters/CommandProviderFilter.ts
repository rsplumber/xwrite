import {AbstractFilter} from "../abstractions/filters/AbstractFilter";
import {Request} from "../Request";
import {CommandExecutor} from "../executors/CommandExecutor";
import {Response} from "../Response";

export class CommandProviderFilter extends AbstractFilter {
    public async handleAsync(request: Request, response: Response): Promise<void> {
        const commandResponse = await CommandExecutor.executeAsync(request);
        await super.handleAsync(request, commandResponse);
    }

    order(): number {
        return 0;
    }

    identifier(): string {
        return "commandProvider";
    }
}
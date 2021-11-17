import {AbstractFilter} from "../abstractions/filters/AbstractFilter";
import {Request} from "../Request";
import {CommandExecutor} from "../executors/CommandExecutor";
import {Response} from "../Response";

export class CommandProviderFilter extends AbstractFilter {

    constructor(order: number) {
        super(order);
    }

    public async handleAsync(request: Request, response: Response): Promise<void> {
        const commandResponse = await CommandExecutor.executeAsync(request);
        await super.handleAsync(request, commandResponse);
    }

    identifier(): string {
        return "commandProvider";
    }
}
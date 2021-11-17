import {AbstractFilter} from "../../core/abstractions/filters/AbstractFilter";
import {Request} from "../../core/Request";
import {CommandExecutor} from "../../core/executors/CommandExecutor";
import {Response} from "../../core/Response";

export class CommandProviderFilter extends AbstractFilter {

    constructor(order: number) {
        super(order);
    }

    name(): string {
        return "commandProviderFilter";
    }

    public async handleAsync(request: Request, response: Response): Promise<void> {
        const commandResponse = await CommandExecutor.executeAsync(request);
        await super.handleAsync(request, commandResponse);
    }

}
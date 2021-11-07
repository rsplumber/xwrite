import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {CommandExecutor} from "../commands/abstractions/CommandExecutor";

export class CommandProviderFilter extends AbstractFilter {
    public async handle(request: Request): Promise<void> {
        console.log("command:" + request.commandIdentifier);
        await CommandExecutor.getInstance().execute(request);
        await super.handle(request);
    }

    order(): number {
        return 0;
    }
}
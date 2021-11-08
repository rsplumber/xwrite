import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class RequestInitializerFilter extends AbstractFilter {
    public async handleAsync(request: Request): Promise<void> {
        request.attachToData("debug_mode", Context.getInstance().isDebugMode());
        if (request.commandIdentifier == null) {
            return;
        }

        if ((request.commandIdentifier == "batchWriter" || request.commandIdentifier == "freeWriter")
            && Context.getTextNodesContainer().getAll().length === 0) {
            return;
        }
        await super.handleAsync(request);
    }

    order(): number {
        return 0;
    }
}
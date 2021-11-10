import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {Response} from "../../shared/Response";

export class RequestInitializerFilter extends AbstractFilter {
    public async handleAsync(request: Request, response: Response): Promise<void> {
        request.attachToData("debug_mode", Context.getInstance().isDebugMode());
        if (request.commandIdentifier == null) {
            return;
        }

        if ((request.commandIdentifier == "batchWriter" || request.commandIdentifier == "freeWriter")
            && Context.getTextNodesContainer().getAll().length === 0) {
            return;
        }
        await super.handleAsync(request, response);
    }

    order(): number {
        return 0;
    }
}
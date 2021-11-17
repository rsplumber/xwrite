import {AbstractFilter} from "../../core/abstractions/filters/AbstractFilter";
import {Request} from "../../core/Request";
import {Context} from "../Context";
import {Response} from "../../core/Response";

export class RequestInitializerFilter extends AbstractFilter {

    constructor(order: number) {
        super(order);
    }

    name(): string {
        return "initializerFilter";
    }

    public async handleAsync(request: Request, response: Response): Promise<void> {
        request.attachToData("debug_mode", Context.getInstance().isDebugMode());
        if (request.commandIdentifier == null) {
            return;
        }

        if ((request.commandIdentifier == "batchWriter" || request.commandIdentifier == "freeWriter")
            && Context.getTextNodesContainer().count() === 0) {
            return;
        }
        await super.handleAsync(request, response);
    }


}
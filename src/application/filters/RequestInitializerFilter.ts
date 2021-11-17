import {AbstractFilter} from "../abstractions/filters/AbstractFilter";
import {Request} from "../Request";
import {Context} from "../Context";
import {Response} from "../Response";

export class RequestInitializerFilter extends AbstractFilter {

    identifier(): string {
        return "initializer";
    }

    constructor(order: number) {
        super(order);
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
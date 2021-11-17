import {AbstractFilter} from "../../core/abstractions/filters/AbstractFilter";
import {Request} from "../../core/Request";
import {Response} from "../../core/Response";

export class MessageCenterFilter extends AbstractFilter {

    constructor(order: number) {
        super(order);
    }

    name(): string {
        return "messageCenterFilter";
    }

    public async handleAsync(request: Request, response: Response): Promise<void> {
        const type = response.getFromData("messageCenterType") as string;
        const message = response.getFromData("messageCenter");
        if (type && message) {
            figma.ui.postMessage({
                'type': type,
                'data': message
            })
        }
        await super.handleAsync(request, response);
    }

}
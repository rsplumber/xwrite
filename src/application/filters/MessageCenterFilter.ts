import {AbstractFilter} from "../abstractions/filters/AbstractFilter";
import {Request} from "../Request";
import {Response} from "../Response";

export class MessageCenterFilter extends AbstractFilter {

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

    order(): number {
        return 0;
    }

    identifier(): string {
        return "messageCenter";
    }
}
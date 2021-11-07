import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class MessageCenterFilter extends AbstractFilter {
    public async handleAsync(request: Request): Promise<void> {
        const type = Context.currentResponse().getFromData("messageCenterType") as string;
        const message = Context.currentResponse().getFromData("messageCenter");
        if (type && message) {
            figma.ui.postMessage({
                'type': type,
                'data': message
            })
        }
        await super.handleAsync(request);
    }

    order(): number {
        return 0;
    }
}
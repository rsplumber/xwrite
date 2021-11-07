import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class MessageCenterFilter extends AbstractFilter {
    public async handle(request: Request): Promise<void> {
        const type = Context.currentResponse().getValue("messageCenterType") as string;
        const message = Context.currentResponse().getValue("messageCenter");
        if (type && message) {
            figma.ui.postMessage({
                'type': type,
                'data': message
            })
        }
        await super.handle(request);
    }

    order(): number {
        return 0;
    }
}
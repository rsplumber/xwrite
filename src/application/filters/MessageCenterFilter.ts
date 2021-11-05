import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class MessageCenterFilter extends AbstractFilter {
    public handle(request: Request): void {
        const type = Context.currentResponse().data['messageCenterType'] as string;
        const message = Context.currentResponse().data['messageCenter'];
        if (type && message) {
            figma.ui.postMessage({
                'type': type,
                'data': message
            })
        }
        super.handle(request);
    }

    order(): number {
        return 0;
    }
}
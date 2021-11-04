import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Response} from "../../shared/Response";
import {Context} from "../Context";

export class MessageCenterFilter extends AbstractFilter {
    public handle(request: Request): Response {
        const type = Context.currentResponse().data['messageCenterType'] as string;
        const message = Context.currentResponse().data['messageCenter'];
        if (type && message) {
            figma.ui.postMessage({
                'type': type,
                'data': message
            })
        }
        return super.handle(request);
    }

    order(): number {
        return 0;
    }
}
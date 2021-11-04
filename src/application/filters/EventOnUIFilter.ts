import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Response} from "../../shared/Response";
import {Context} from "../Context";

export class EventOnUIFilter extends AbstractFilter {
    public handle(request: Request): Response {
        const type = Context.currentResponse().data['type'] as string;
        const data = Context.currentResponse().data['data'];
        if (type != null) {
            figma.ui.postMessage({
                'type': type,
                'data': data
            })
        }

        return super.handle(request);
    }

    order(): number {
        return 0;
    }
}
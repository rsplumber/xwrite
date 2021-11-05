import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class EventOnUIFilter extends AbstractFilter {
    public handle(request: Request): void {
        const type = Context.currentResponse().data['type'] as string;
        const data = Context.currentResponse().data['data'];
        if (type != null) {
            figma.ui.postMessage({
                'type': type,
                'data': data
            })
        }

        super.handle(request);
    }

    order(): number {
        return 0;
    }
}
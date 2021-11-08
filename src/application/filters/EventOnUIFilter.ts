import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class EventOnUIFilter extends AbstractFilter {
    public async handleAsync(request: Request): Promise<void> {
        const uiEvents = Context.currentResponse().getFromData("ui_events") as Map<string, any>
        if (uiEvents) {
            uiEvents.forEach((value, key) => {
                figma.ui.postMessage({
                    'type': key,
                    'data': value
                })
            });
        }
        await super.handleAsync(request);
    }

    order(): number {
        return 0;
    }
}
import {AbstractFilter} from "../../core/abstractions/filters/AbstractFilter";
import {Request} from "../../core/Request";
import {Response} from "../../core/Response";

export class EventOnUIFilter extends AbstractFilter {

    constructor(order: number) {
        super(order);
    }

    name(): string {
        return "eventOnUiFilter";
    }

    public async handleAsync(request: Request, response: Response): Promise<void> {
        const uiEvents = response.getFromData("ui_events") as Map<string, any>
        if (uiEvents) {
            uiEvents.forEach((value, key) => {
                figma.ui.postMessage({
                    'type': key,
                    'data': value
                })
            });
        }
        await super.handleAsync(request, response);
    }

}
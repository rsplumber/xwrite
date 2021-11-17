import {AbstractFilter} from "../abstractions/filters/AbstractFilter";
import {Request} from "../Request";
import {Response} from "../Response";

export class EventOnUIFilter extends AbstractFilter {

    constructor(order: number) {
        super(order);
    }

    identifier(): string {
        return "eventOnUi";
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
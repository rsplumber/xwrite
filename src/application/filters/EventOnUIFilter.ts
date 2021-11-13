import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../Request";
import {Response} from "../Response";

export class EventOnUIFilter extends AbstractFilter {
    public async handleAsync(request: Request, response: Response): Promise<void> {
        console.log("here");
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

    order(): number {
        return 0;
    }

    identifier(): string {
        return "eventOnUi";
    }
}
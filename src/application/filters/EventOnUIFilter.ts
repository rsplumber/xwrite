import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class EventOnUIFilter extends AbstractFilter {
    public async handleAsync(request: Request): Promise<void> {
        console.log("ui" + + request.commandIdentifier)
        const type = Context.currentResponse().getFromData("type") as string;
        const data = Context.currentResponse().getFromData("data");
        if (type) {
            figma.ui.postMessage({
                'type': type,
                'data': data
            })
        }

        await super.handleAsync(request);
    }

    order(): number {
        return 0;
    }
}
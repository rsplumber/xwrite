import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class EventOnUIFilter extends AbstractFilter {
    public async handle(request: Request): Promise<void> {
        console.log("ui" + + request.commandIdentifier)
        const type = Context.currentResponse().getValue("type") as string;
        const data = Context.currentResponse().getValue("data");
        if (type) {
            figma.ui.postMessage({
                'type': type,
                'data': data
            })
        }

        await super.handle(request);
    }

    order(): number {
        return 0;
    }
}
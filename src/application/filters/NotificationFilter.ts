import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class NotificationFilter extends AbstractFilter {
    public async handleAsync(request: Request): Promise<void> {
        const notification = Context.currentResponse().getFromData("notificationMessage");
        if (notification) {
            figma.notify(notification);
        }
        await super.handleAsync(request);
    }

    order(): number {
        return 0;
    }
}
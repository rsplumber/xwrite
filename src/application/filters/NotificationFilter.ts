import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class NotificationFilter extends AbstractFilter {
    public async handle(request: Request): Promise<void> {
        const notification = Context.currentResponse().getValue("notificationMessage");
        if (notification) {
            figma.notify(notification);
        }
        await super.handle(request);
    }

    order(): number {
        return 0;
    }
}
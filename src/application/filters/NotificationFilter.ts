import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class NotificationFilter extends AbstractFilter {
    public handle(request: Request): void {
        const notification = Context.currentResponse().data['notificationMessage'];
        if (notification != null) {
            figma.notify(notification);
        }
        super.handle(request);
    }

    order(): number {
        return 0;
    }
}
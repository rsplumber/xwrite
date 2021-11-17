import {AbstractFilter} from "../../core/abstractions/filters/AbstractFilter";
import {Request} from "../../core/Request";
import {Response} from "../../core/Response";

export class NotificationFilter extends AbstractFilter {

    constructor(order: number) {
        super(order);
    }

    name(): string {
        return "notificationFilter";
    }

    public async handleAsync(request: Request, response: Response): Promise<void> {
        const notification = response.getFromData("notificationMessage");
        if (notification) {
            figma.notify(notification);
        }
        await super.handleAsync(request, response);
    }
}
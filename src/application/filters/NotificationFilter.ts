import {AbstractFilter} from "../abstractions/filters/AbstractFilter";
import {Request} from "../Request";
import {Response} from "../Response";

export class NotificationFilter extends AbstractFilter {

    constructor(order: number) {
        super(order);
    }

    identifier(): string {
        return "notification";
    }

    public async handleAsync(request: Request, response: Response): Promise<void> {
        const notification = response.getFromData("notificationMessage");
        if (notification) {
            figma.notify(notification);
        }
        await super.handleAsync(request, response);
    }
}
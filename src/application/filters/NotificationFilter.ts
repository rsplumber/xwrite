import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Response} from "../../shared/Response";

export class NotificationFilter extends AbstractFilter {
    public async handleAsync(request: Request, response: Response): Promise<void> {
        const notification = response.getFromData("notificationMessage");
        if (notification) {
            figma.notify(notification);
        }
        await super.handleAsync(request, response);
    }

    order(): number {
        return 0;
    }
}
import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Response} from "../../shared/Response";
import {Context} from "../Context";

export class NotificationFilter extends AbstractFilter {
    public handle(request: Request): Response {
        const notification = Context.currentResponse().data['notificationMessage'];
        if(notification != null){
            figma.notify(notification);
        }
        return super.handle(request);
    }

    order(): number {
        return 0;
    }
}
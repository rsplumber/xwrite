import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class RequestInitializerFilter extends AbstractFilter {
    public handle(request: Request): void {
        request.attachToData("debug_mode", Context.isDebugMode());
        if (request.commandIdentifier == null || request.data == null) {
            return;
        }
        super.handle(request);
    }

    order(): number {
        return 0;
    }
}
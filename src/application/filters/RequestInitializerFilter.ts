import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Response} from "../../shared/Response";
import {Context} from "../Context";

export class RequestInitializerFilter extends AbstractFilter {
    public handle(request: Request): Response {
        request.attachToData("debug_mode" ,Context.isDebugMode());
        if(request.commandIdentifier == null || request.data == null){
            return;
        }
        return super.handle(request);
    }

    order(): number {
        return 0;
    }
}
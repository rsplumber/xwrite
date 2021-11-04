import {AbstractFilter} from "./abstraction/AbstractFilter";
import {Request} from "../../shared/Request";
import {Response} from "../../shared/Response";

export class RequestValidationFilter extends AbstractFilter {
    public handle(request: Request): Response {
        return super.handle(request);
    }

    order(): number {
        return 0;
    }
}
import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class PrepareDataFilter extends AbstractFilter {
    public handle(request: Request): void {
        Context.generateRequest("nodeDetector");
        super.handle(request);
    }

    order(): number {
        return 0;
    }
}
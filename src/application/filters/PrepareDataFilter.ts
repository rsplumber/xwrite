import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class PrepareDataFilter extends AbstractFilter {
    public handle(request: Request): void {
        const needRefresh = Context.currentResponse().getValue("refreshData") as boolean;
        if (needRefresh) {
            console.log("here!");
            Context.generateRequest("nodeDetector");
        }
        super.handle(request);
    }

    order(): number {
        return 0;
    }
}
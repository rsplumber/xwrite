import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {RequestExecutor} from "../RequestExecutor";

export class RefreshDataFilter extends AbstractFilter {
    public handle(request: Request): void {
        const needRefresh = Context.currentResponse().getValue("refreshData") as boolean;

        if (needRefresh) {
            RequestExecutor.execute(Context.generateRequest("nodeDetector"));
        }
        super.handle(request);
    }

    order(): number {
        return 0;
    }
}
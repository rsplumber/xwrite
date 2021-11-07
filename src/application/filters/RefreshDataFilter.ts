import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class RefreshDataFilter extends AbstractFilter {
    public async handle(request: Request): Promise<void> {
        const needRefresh = Context.currentResponse().getValue("refreshData") as boolean;
        if (needRefresh) {
            await Context.executeRequest(Context.generateRequest("detectNode"));
        }
        await super.handle(request);
    }

    order(): number {
        return 0;
    }
}
import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class RefreshDataFilter extends AbstractFilter {
    public async handleAsync(request: Request): Promise<void> {
        const needRefresh = Context.currentResponse().getFromData("refreshData") as boolean;
        if (needRefresh) {
            await Context.executeRequestAsync(Context.generateRequest("detectNode"));
        }
        await super.handleAsync(request);
    }

    order(): number {
        return 0;
    }
}
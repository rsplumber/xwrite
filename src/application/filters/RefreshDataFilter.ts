import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {DelayProvider} from "../helpers/DelayProvider";
import {Response} from "../../shared/Response";
import {Context} from "../Context";

export class RefreshDataFilter extends AbstractFilter {

    public async handleAsync(request: Request, response: Response): Promise<void> {
        const needRefresh = response.getFromData("refreshData") as boolean;
        if (needRefresh) {
            const delay = response.getFromData("refreshDataDelay") as number;
            if (delay && delay > 0) {
                await DelayProvider.getInstance().delay(delay);
            }
            await RefreshDataFilter.detectNodes(request);

        }
        await super.handleAsync(request, response);
    }

    order(): number {
        return 0;
    }

    private static async detectNodes(request: Request) {
        await Context.executeRequestAsync(
            Request.generate("nodeDetector")
                .attachToData("findInPage", request.getFromData("findInPage")));
    }

}
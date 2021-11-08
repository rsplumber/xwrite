import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {CommandExecutor} from "../commands/abstractions/CommandExecutor";
import {DelayProvider} from "../helpers/DelayProvider";

export class RefreshDataFilter extends AbstractFilter {
    public async handleAsync(request: Request): Promise<void> {
        const needRefresh = Context.currentResponse().getFromData("refreshData") as boolean;
        if (needRefresh) {
            const delay = Context.currentResponse().getFromData("refreshDataDelay") as number;
            if (delay && delay > 0) {
                await DelayProvider.getInstance().delay(delay);
            }
            await RefreshDataFilter.detectNodes(request);

        }
        await super.handleAsync(request);
    }

    order(): number {
        return 0;
    }

    private static async detectNodes(request: Request) {
        await CommandExecutor.executeAsync(Context.generateRequest("nodeDetector")
            .attachToData("findInPage", request.getFromData("findInPage")));
    }

}
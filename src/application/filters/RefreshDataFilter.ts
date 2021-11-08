import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {CommandExecutor} from "../commands/abstractions/CommandExecutor";

export class RefreshDataFilter extends AbstractFilter {
    public async handleAsync(request: Request): Promise<void> {
        const needRefresh = Context.currentResponse().getFromData("refreshData") as boolean;
        if (needRefresh) {
            const delay = Context.currentResponse().getFromData("refreshDataDelay") as number;
            if (delay && delay > 0) {
                this.delay(delay).then(async _ => {
                    await RefreshDataFilter.detectNodes();
                })
            } else {
                await RefreshDataFilter.detectNodes();
            }

        }
        await super.handleAsync(request);
    }

    order(): number {
        return 0;
    }

    private static async detectNodes() {
        await CommandExecutor.getInstance().executeAsync(Context.generateRequest("nodeDetector"));
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
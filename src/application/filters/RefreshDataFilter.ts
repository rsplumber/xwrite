import {AbstractFilter} from "../../core/abstractions/filters/AbstractFilter";
import {Request} from "../../core/Request";
import {DelayProvider} from "../../helpers/DelayProvider";
import {Response} from "../../core/Response";
import {Context} from "../Context";

export class RefreshDataFilter extends AbstractFilter {

    constructor(order: number) {
        super(order);
    }

    private static async refresh(request: Request, response: Response) {
        const hardRefresh = request.getFromViewData("hardRefresh");
        if (hardRefresh) {
            await this.detectNodes();
            return;
        }
        await this.updateNodeData(response);
    }

    private static async detectNodes() {
        await Context.executeRequestAsync(Request.generate("nodeDetector"));
    }

    private static async updateNodeData(response: Response) {
        const newRequest = Request.generate("updateNodeData")
            .attachToData("keepCurrentState", response.getFromData("keepCurrentState"));
        await Context.executeRequestAsync(newRequest);
    }

    name(): string {
        return "refreshDataFilter";
    }

    public async handleAsync(request: Request, response: Response): Promise<void> {
        const needRefresh = response.getFromData("refreshData") as boolean;
        if (needRefresh) {
            const delay = response.getFromData("refreshDataDelay") as number;
            if (delay && delay > 0) {
                const delayProvider = Context.resolve<DelayProvider>("delayProvider");
                await delayProvider.delay(delay);
            }
            await RefreshDataFilter.refresh(request, response);
        }
        await super.handleAsync(request, response);
    }

}
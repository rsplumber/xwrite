import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../Request";
import {DelayProvider} from "../helpers/DelayProvider";
import {Response} from "../Response";
import {Context} from "../Context";

export class RefreshDataFilter extends AbstractFilter {

    public async handleAsync(request: Request, response: Response): Promise<void> {
        const needRefresh = response.getFromData("refreshData") as boolean;
        if (needRefresh) {
            const delay = response.getFromData("refreshDataDelay") as number;
            if (delay && delay > 0) {
                await DelayProvider.getInstance().delay(delay);
            }
            await RefreshDataFilter.refresh(request, response);
        }
        await super.handleAsync(request, response);
    }

    order(): number {
        return 0;
    }

    private static async refresh(request: Request, response: Response) {
        const hardRefresh = request.getFromData("hardRefresh");
        if (hardRefresh) {
            await this.detectNodes();
            return;
        }
        await this.updateNodeData(response);
    }

    private static async detectNodes() {
        await Context.executeRequestInPipelineAsync(Request.generate("nodeDetector"));
    }

    private static async updateNodeData(response: Response) {
        const newRequest = Request.generate("updateNodeData")
            .attachToData("keepCurrentState", response.getFromData("keepCurrentState"));
        await Context.executeRequestInPipelineAsync(newRequest);
    }

}
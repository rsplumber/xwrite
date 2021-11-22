import {Response} from "../../core/Response";
import {Request} from "../../core/Request";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";
import {FigmaHelper} from "../../helpers/FigmaHelper";
import {Command} from "./Command";

export class FreeWriterCommand extends Command {

    identifier(): string {
        return "freeWriter";
    }


    async executeAsync(request: Request): Promise<Response> {
        return await this.applyChangesAsync(request);
    }


    private async applyChangesAsync(request: Request): Promise<Response> {
        const finalText = request.getFromViewData("text") as string;
        const directionFixedText = TextDirectionFixer.fix(finalText);

        for (const nodeData of this.getTextNodeContainer().getAll()) {
            await FigmaHelper.setNodeTextAsync(nodeData.node, directionFixedText);
            nodeData.finalText = finalText;
        }
        return this.success({
            softRefreshData: {},
            refreshDataOnView: this.getTextNodeContainer().getAll()
        });
    }


}
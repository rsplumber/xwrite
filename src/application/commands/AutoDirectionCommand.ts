import {Response} from "../../core/Response";
import {Request} from "../../core/Request";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";
import {FigmaHelper} from "../../helpers/FigmaHelper";
import {Command} from "./Command";

export class AutoDirectionCommand extends Command {

    identifier(): string {
        return "autoDirection";
    }

    async executeAsync(request: Request): Promise<Response> {
        return await this.applyChangesAsync();
    }


    private async applyChangesAsync(): Promise<Response> {
        for (const nodeData of this.getTextNodeContainer().getAll()) {
            const finalText = TextDirectionFixer.fix(nodeData.text);
            await FigmaHelper.setNodeTextAsync(nodeData.node, finalText);
            nodeData.finalText = TextDirectionFixer.fix(finalText);
        }
        return this.success({
            notificationMessage: "Direction fixed",
            softRefreshData: {
                delay: 200
            },
            refreshDataOnView: this.getTextNodeContainer().getAll()
        });
    }

}
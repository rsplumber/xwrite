import {Response} from "../Response";
import {Request} from "../Request";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {Figma} from "../helpers/Figma";
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
            await Figma.setNodeTextAsync(nodeData.node, finalText);
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
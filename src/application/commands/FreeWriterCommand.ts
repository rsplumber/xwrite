import {Response} from "../Response";
import {Request} from "../Request";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {Figma} from "../helpers/Figma";
import {Command} from "./Command";

export class FreeWriterCommand extends Command {

    identifier(): string {
        return "freeWriter";
    }


    async executeAsync(request: Request): Promise<Response> {
        return await this.applyChangesAsync(request);
    }


    private async applyChangesAsync(request: Request): Promise<Response> {
        const finalText = request.getFromData("data") as string;
        const directionFixedText = TextDirectionFixer.fix(finalText);

        for (const nodeData of this.getTextNodeContainer().getAll()) {
            await Figma.setNodeTextAsync(nodeData.node, directionFixedText);
            nodeData.finalText = finalText;
        }
        return this.success({
            softRefreshData: {},
            refreshDataOnView: this.getTextNodeContainer().getAll()
        });
    }


}
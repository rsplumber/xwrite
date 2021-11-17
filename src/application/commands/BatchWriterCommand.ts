import {Response} from "../Response";
import {Request} from "../Request";
import {TextNodeData} from "../../shared/TextNodeData";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {Figma} from "../helpers/Figma";
import {Command} from "./Command";

export class BatchWriterCommand extends Command {

    identifier(): string {
        return "batchWriter";
    }

    async executeAsync(request: Request): Promise<Response> {
        return await this.applyChangesAsync(request);
    }

    private async applyChangesAsync(request: Request): Promise<Response> {
        const finalData: Array<TextNodeData> = request.getFromData("data") as Array<TextNodeData>;

        for (const nodeData of this.getTextNodeContainer().getAll()) {
            const textNode = nodeData.node as TextNode;
            const selectedTextData = finalData.find(d => d.id == textNode.id);
            let finalText = selectedTextData.text;
            if (selectedTextData.finalText.length !== 0) {
                finalText = TextDirectionFixer.fix(selectedTextData.finalText);
                await Figma.setNodeTextAsync(textNode, finalText);
            }
            nodeData.finalText = TextDirectionFixer.fix(finalText);
        }

        return this.success({
            notificationMessage: "Changes applied",
            softRefreshData: {},
            refreshDataOnView: this.getTextNodeContainer().getAll()
        });
    }

}
import {Response} from "../Response";
import {Request} from "../Request";
import {TextNodeData} from "../../shared/TextNodeData";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {Figma} from "../helpers/Figma";
import {AbstractCommand} from "./abstractions/AbstractCommand";

export class BatchWriterCommand extends AbstractCommand {

    identifier(): string {
        return "batchWriter";
    }

    containerId(): string {
        return this.identifier();
    }

    async executeAsync(request: Request): Promise<Response> {
        await BatchWriterCommand.applyChangesAsync(request);
        return this.success({
            notificationMessage: "Changes applied",
            softRefreshData: {},
            refreshDataOnView: Context.getTextNodesContainer().getAll()
        });
    }

    private static async applyChangesAsync(request: Request) {
        const finalData: Array<TextNodeData> = request.getFromData("data") as Array<TextNodeData>;

        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const textNode = nodeData.node as TextNode;
            const selectedTextData = finalData.find(d => d.id == textNode.id);
            if (selectedTextData.final_text.length !== 0) {
                const finalText = TextDirectionFixer.fix(selectedTextData.final_text);
                await Figma.setNodeTextAsync(textNode, finalText);
                nodeData.final_text = TextDirectionFixer.fix(finalText);
            }
        }
    }

}
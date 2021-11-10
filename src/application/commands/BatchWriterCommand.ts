import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {TextNodeData} from "../../shared/TextNodeData";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {Figma} from "../helpers/Figma";

export class BatchWriterCommand extends AbstractCommand {

    identifier(): string {
        return "batchWriter";
    }

    async executeAsync(request: Request): Promise<Response> {
        await BatchWriterCommand.applyChangesAsync(request);
        return Response.generator()
            .refreshData()
            .setNotificationMessage("Changes applied")
            .generate();
    }

    private static async applyChangesAsync(request: Request) {
        const finalData: Array<TextNodeData> = request.getFromData("data") as Array<TextNodeData>;

        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const textNode = nodeData.node as TextNode;
            const selectedTextData = finalData.find(d => d.id == textNode.id);
            if (selectedTextData.final_text.length !== 0) {
                const finalText = TextDirectionFixer.fix(selectedTextData.final_text);
                await Figma.setNodeText(textNode, finalText);
            }
        }
    }

}
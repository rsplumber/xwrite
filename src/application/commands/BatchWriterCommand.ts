import {ICommand} from "./abstractions/ICommand";
import {Response} from "../Response";
import {Request} from "../Request";
import {TextNodeData} from "../../shared/TextNodeData";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {Figma} from "../helpers/Figma";

export class BatchWriterCommand implements ICommand {

    identifier(): string {
        return "batchWriter";
    }

    containerId(): string {
        return this.identifier();
    }

    async executeAsync(request: Request): Promise<Response> {
        await BatchWriterCommand.applyChangesAsync(request);
        return Response.generator()
            .setNotificationMessage("Changes applied")
            .softRefreshData()
            .generate();
    }

    private static async applyChangesAsync(request: Request) {
        const finalData: Array<TextNodeData> = request.getFromData("data") as Array<TextNodeData>;

        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const textNode = nodeData.node as TextNode;
            const selectedTextData = finalData.find(d => d.id == textNode.id);
            if (selectedTextData.final_text.length !== 0) {
                const finalText = TextDirectionFixer.fix(selectedTextData.final_text);
                await Figma.setNodeTextAsync(textNode, finalText);
                nodeData.final_text = finalText;
            }
        }
    }

}
import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {TextNodeData} from "../../shared/TextNodeData";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";

export class BatchWriterCommand extends AbstractCommand {

    identifier(): string {
        return "batchWriter";
    }

    async executeAsync(request: Request): Promise<Response> {
        await BatchWriterCommand.applyChangesAsync(request);
        return Context.responseGenerator(true)
            .refreshData()
            .setNotificationMessage("Changes applied")
            .generate();
    }

    private static async applyChangesAsync(request: Request) {
        const finalData: Array<TextNodeData> = request.getFromData("data") as Array<TextNodeData>;

        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const textNode = nodeData.node as TextNode;
            const selectedTextData = finalData.find(d => d.id == textNode.id);
            await figma.loadFontAsync(textNode.fontName as FontName);
            if (selectedTextData.final_text.length !== 0) {
                textNode.characters = TextDirectionFixer.fix(selectedTextData.final_text);
            }
        }
    }

}
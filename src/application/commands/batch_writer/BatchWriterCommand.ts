import {AbstractCommand} from "../abstractions/AbstractCommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {TextNodeData} from "../../../shared/TextNodeData";
import {Context} from "../../Context";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";
import {RequestExecutor} from "../../RequestExecutor";

export class BatchWriterCommand extends AbstractCommand {

    execute(request: Request): Response {

        this.applyChanges(request).then(_ =>{
            RequestExecutor.execute(Context.generateRequest("nodeDetector"));
        });
        return Context.responseGenerator(true)
            .setNotificationMessage("Changes applied")
            .generate();
    }

    private async applyChanges(request: Request) {
        const finalData: Array<TextNodeData> = request.getValue("data") as Array<TextNodeData>;

        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const textNode = nodeData.node as TextNode;
            const selectedTextData = finalData.find(d => d.id == textNode.id);
            await figma.loadFontAsync(textNode.fontName as FontName);
            if (selectedTextData.final_text.length !== 0) {
                textNode.characters = TextDirectionFixer.fix(selectedTextData.final_text);
            }
        }
    }

    identifier(): string {
        return "batchWriter";
    }

}
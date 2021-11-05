import {AbstractCommand} from "../abstractions/AbstractCommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {TextNodeData} from "../../../shared/TextNodeData";
import {Context} from "../../Context";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";

export class BatchWriterCommand extends AbstractCommand {

    execute(request: Request): Response {
        const final_data: Array<TextNodeData> = request.data['text_data'] as Array<TextNodeData>;
        Context.getTextNodesContainer().getAll().forEach(async nodeData => {
            const text_node = nodeData.node as TextNode;
            const selected_text = final_data.find(d => d.id == text_node.id);

            await figma.loadFontAsync(text_node.fontName as FontName);

            if (selected_text.final_text.length !== 0) {
                text_node.characters = TextDirectionFixer.fix(selected_text.final_text);
            }
        });

        return undefined;
    }

    identifier(): string {
        return "batchWriter";
    }

}
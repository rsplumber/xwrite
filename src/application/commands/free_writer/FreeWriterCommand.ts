import {ICommand} from "../abstraction/ICommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {Context} from "../../Context";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";

export class FreeWriterCommand implements ICommand {
    identifier(): string {
        return "freeWriter";
    }

    execute(request: Request): Response {

        const finalText = request.data['text'];
        const directionFixedText = TextDirectionFixer.fix(finalText);

        Context.getTextNodesContainer().getAll().forEach(async nodeData => {
            const textNode = nodeData.node as TextNode;
            await figma.loadFontAsync(textNode.fontName as FontName);
            textNode.characters = directionFixedText;
        });
        return undefined;
    }


}
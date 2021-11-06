import {AbstractCommand} from "../abstractions/AbstractCommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {Context} from "../../Context";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";

export class FreeWriterCommand extends AbstractCommand {


    execute(request: Request): Response {
        const finalText = request.getValue("data") as string;
        const directionFixedText = TextDirectionFixer.fix(finalText);
        Context.getTextNodesContainer().getAll().forEach(async nodeData => {
            const textNode = nodeData.node as TextNode;
            await figma.loadFontAsync(textNode.fontName as FontName);
            textNode.characters = directionFixedText;
        });
        return Context.responseGenerator(true)
            .generate();
    }

    identifier(): string {
        return "freeWriter";
    }


}
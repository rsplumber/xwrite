import {AbstractCommand} from "../abstractions/AbstractCommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {Context} from "../../Context";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";

export class AutoDirectionCommand extends AbstractCommand {


    execute(request: Request): Response {
        Context.getTextNodesContainer().getAll().forEach(async nodeData => {
            const textNode = nodeData.node as TextNode;

            await figma.loadFontAsync(textNode.fontName as FontName);

            textNode.characters = TextDirectionFixer.fix(nodeData.text);

        });

        return Context.responseGenerator(true)
            .setNotificationMessage("Direction fixed")
            .generate();
    }

    identifier(): string {
        return "autoDirection";
    }


}
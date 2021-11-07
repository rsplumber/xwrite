import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";

export class AutoDirectionCommand extends AbstractCommand {

    identifier(): string {
        return "autoDirection";
    }

    async execute(request: Request): Promise<Response> {
        await AutoDirectionCommand.applyChanges(request);
        return Context.responseGenerator(true)
            .setNotificationMessage("Direction fixed")
            .generate();
    }


    private static async applyChanges(request: Request) {
        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const textNode = nodeData.node as TextNode;
            await figma.loadFontAsync(textNode.fontName as FontName);
            textNode.characters = TextDirectionFixer.fix(nodeData.text);
        }
    }


}
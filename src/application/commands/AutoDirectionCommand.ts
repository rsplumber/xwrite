import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";

export class AutoDirectionCommand extends AbstractCommand {

    identifier(): string {
        return "autoDirection";
    }

    async executeAsync(request: Request): Promise<Response> {
        await AutoDirectionCommand.applyChangesAsync();
        return Context.responseGenerator(true)
            .setNotificationMessage("Direction fixed")
            .refreshData(200)
            .generate();
    }


    private static async applyChangesAsync() {
        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const textNode = nodeData.node as TextNode;
            await figma.loadFontAsync(textNode.fontName as FontName);
            textNode.characters = TextDirectionFixer.fix(textNode.characters);
        }
    }


}
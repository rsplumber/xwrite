import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {AbstractReplacer} from "../replacers/abstractions/AbstractReplacer";

export class ReplacerCommand extends AbstractCommand {

    identifier(): string {
        return "replacer";
    }

    async executeAsync(request: Request): Promise<Response> {

        await ReplacerCommand.applyChangesAsync(request);

        return Context.responseGenerator(true)
            .setNotificationMessage("Replaced")
            .generate();
    }

    private static async applyChangesAsync(request: Request) {
        const replaceFrom = request.getFromData("data")['replace_from'] as string;
        const replaceTo = request.getFromData("data")['replace_to'] as string;

        const replacer = ReplacerCommand.getReplacer(replaceFrom);

        for (const nodeData of Context.getTextNodesContainer().getAll()) {

            const text_node = nodeData.node as TextNode;
            await figma.loadFontAsync(text_node.fontName as FontName);

            replacer.replace(nodeData, replaceFrom, replaceTo);

        }
    }

    private static getReplacer(id: string): AbstractReplacer {
        const container = Context.getReplacersContainer();
        let replacer = container.getById(id);
        if (replacer == null) {
            replacer = container.getById("$__standard");
        }
        return replacer;
    }


}
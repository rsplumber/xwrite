import {AbstractCommand} from "../abstractions/AbstractCommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {Context} from "../../Context";
import {AbstractReplacer} from "./AbstractReplacer";

export class ReplacerCommand extends AbstractCommand {

    identifier(): string {
        return "replacer";
    }

    async execute(request: Request): Promise<Response> {

        await ReplacerCommand.applyChanges(request);

        return Context.responseGenerator(true)
            .setNotificationMessage("Replaced")
            .generate();
    }

    private static async applyChanges(request: Request) {
        const replaceFrom = request.getValue("data")['replace_from'] as string;
        const replaceTo = request.getValue("data")['replace_to'] as string;

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
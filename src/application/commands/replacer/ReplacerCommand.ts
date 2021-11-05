import {AbstractCommand} from "../abstractions/AbstractCommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {Context} from "../../Context";
import {AbstractReplacer} from "./AbstractReplacer";

export class ReplacerCommand extends AbstractCommand {


    execute(request: Request): Response {
        const replaceFrom = request.data['replace_from'] as string;
        const replaceTo = request.data['replace_to'] as string;
        Context.getTextNodesContainer().getAll().forEach(async nodeData => {

            const text_node = nodeData.node as TextNode;
            await figma.loadFontAsync(text_node.fontName as FontName);

            const replacer = ReplacerCommand.getReplacer(replaceFrom);
            replacer.replace(nodeData, replaceFrom, replaceTo);

        });

        return undefined;
    }

    private static getReplacer(id: string): AbstractReplacer {
        const container = Context.getReplacersContainer();
        let replacer = container.getById(id);
        if (replacer == null) {
            replacer = container.getById("$__standard");
        }
        return replacer;
    }

    identifier(): string {
        return "replacer";
    }


}
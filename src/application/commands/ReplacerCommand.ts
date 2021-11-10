import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {AbstractReplacer} from "../replacers/abstractions/AbstractReplacer";
import {CommandExecutor} from "./abstractions/CommandExecutor";
import {Figma} from "../helpers/Figma";

export class ReplacerCommand extends AbstractCommand {

    identifier(): string {
        return "replacer";
    }

    async executeAsync(request: Request): Promise<Response> {

        if (Context.getTextNodesContainer().getAll().length === 0) {
            await CommandExecutor.executeAsync(Context.generateRequest("nodeDetector")
                .attachToData("findInPage", true));
        }
        await ReplacerCommand.applyChangesAsync(request);
        return Context.responseGenerator(true)
            .setNotificationMessage("Replaced")
            .refreshData()
            .generate();
    }

    private static async applyChangesAsync(request: Request) {

        const replaceFrom = request.getFromData("data")['replace_from'] as string;
        const replaceTo = request.getFromData("data")['replace_to'] as string;

        const replacer = ReplacerCommand.getReplacer(replaceFrom);
        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const replacedText = await replacer.replaceAsync(nodeData, replaceFrom, replaceTo);
            await Figma.setNodeText(nodeData.node, replacedText);
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
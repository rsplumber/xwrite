import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {AbstractReplacer} from "../replacers/abstractions/AbstractReplacer";
import {Figma} from "../helpers/Figma";

export class ReplacerCommand extends AbstractCommand {

    identifier(): string {
        return "replacer";
    }

    async executeAsync(request: Request): Promise<Response> {

        if (Context.getTextNodesContainer().getAll().length === 0) {
            await Context.executeRequestAsync(Request.generate("nodeDetector")
                .attachToData("findInPage", true));
        }
        await ReplacerCommand.applyChangesAsync(request);
        return Response.generator()
            .setNotificationMessage("Replaced")
            .refreshData()
            .generate();
    }

    private static async applyChangesAsync(request: Request) {

        const replaceFrom = request.getFromData("data")['replace_from'] as string;
        const replaceTo = request.getFromData("data")['replace_to'] as string;

        const replacer = AbstractReplacer.getBySign(replaceFrom);
        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const replacedText = await replacer.replaceAsync(nodeData, replaceFrom, replaceTo);
            await Figma.setNodeText(nodeData.node, replacedText);
        }
    }


}
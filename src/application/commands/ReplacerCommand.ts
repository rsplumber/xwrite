import {ICommand} from "./abstractions/ICommand";
import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {Figma} from "../helpers/Figma";

export class ReplacerCommand implements ICommand {

    identifier(): string {
        return "replacer";
    }

    containerId(): string {
        return this.identifier();
    }

    async executeAsync(request: Request): Promise<Response> {

        const replaceFrom = request.getFromData("data")['replace_from'] as string;
        const replaceTo = request.getFromData("data")['replace_to'] as string;

        if (Context.getTextNodesContainer().count() === 0) {
            await Context.executeRequestInPipelineAsync(Request.generate("nodeDetector")
                .findInPage(replaceFrom));
        }
        await ReplacerCommand.applyChangesAsync(replaceFrom, replaceTo);
        return Response.generator()
            .setNotificationMessage("Replaced")
            .softRefreshData(500)
            .generate();
    }

    private static async applyChangesAsync(replaceFrom: string, replaceTo: string) {
        let replacer = Context.getReplacersContainer().getById(replaceFrom);
        if (replacer == null) {
            replacer = Context.getReplacersContainer().getById("$__standard");
        }
        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const replacedText = await replacer.replaceAsync(nodeData, replaceFrom, replaceTo);
            await Figma.setNodeText(nodeData.node, replacedText);
        }
    }
}
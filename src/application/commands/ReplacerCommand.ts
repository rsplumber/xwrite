import {ICommand} from "./abstractions/ICommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {Figma} from "../helpers/Figma";
import {ReplacersContainer} from "../containers/ReplacersContainer";

export class ReplacerCommand implements ICommand {

    identifier(): string {
        return "replacer";
    }

    containerId(): string {
        return this.identifier();
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

        let replacer = ReplacersContainer.getInstance().getById(replaceFrom);
        if (replacer == null) {
            replacer = ReplacersContainer.getInstance().getById("$__standard");
        }
        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const replacedText = await replacer.replaceAsync(nodeData, replaceFrom, replaceTo);
            await Figma.setNodeText(nodeData.node, replacedText);
        }
    }


}
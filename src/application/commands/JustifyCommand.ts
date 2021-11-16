import {ICommand} from "./abstractions/ICommand";
import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {Figma} from "../helpers/Figma";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";

export class JustifyCommand implements ICommand {

    identifier(): string {
        return "justify";
    }

    containerId(): string {
        return this.identifier();
    }


    async executeAsync(request: Request): Promise<Response> {
        if (Context.getTextNodesContainer().count() > 1) {
            return Response.generator(false)
                .setNotificationMessage("can't justify more than 1 text")
                .generate();
        }
        await JustifyCommand.applyChangesAsync();
        return Response.generator()
            .setNotificationMessage("Justified")
            .softRefreshData(0, null, true)
            .generate();
    }

    private static async applyChangesAsync() {
        const justifierId = "space_justify";
        const justifier = Context.getJustifierContainer().getById(justifierId);
        if (justifier == null) return;

        const nodeData = Context.getTextNodesContainer().first();
        const maxWidth = nodeData.node.width;
        const justifiedText = await justifier.justifyAsync(nodeData, maxWidth);
        const directionFixedText = TextDirectionFixer.fix(justifiedText);
        await Figma.setNodeTextAsync(nodeData.node, directionFixedText);
    }


}
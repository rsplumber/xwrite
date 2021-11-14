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
        await JustifyCommand.applyChangesAsync(request);
        return Response.generator()
            .setNotificationMessage("Justified")
            .softRefreshData()
            .generate();
    }

    //space = 6px
    private static async applyChangesAsync(request: Request) {
        const justifierId = "space_justify";
        const justifier = Context.getJustifierContainer().getById(justifierId);
        if (justifier == null) return;
        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const maxWidth = nodeData.node.width;
            const justifiedText = await justifier.justifyAsync(nodeData, maxWidth);
            const directionFixedText = TextDirectionFixer.fix(justifiedText);
            await Figma.setNodeTextAsync(nodeData.node, directionFixedText);
        }
    }


}
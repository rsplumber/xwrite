import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {Figma} from "../helpers/Figma";

export class AutoDirectionCommand extends AbstractCommand {

    identifier(): string {
        return "autoDirection";
    }

    async executeAsync(request: Request): Promise<Response> {
        await AutoDirectionCommand.applyChangesAsync();
        return Response.generator()
            .setNotificationMessage("Direction fixed")
            .refreshData(200)
            .generate();
    }


    private static async applyChangesAsync() {
        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const finalText = TextDirectionFixer.fix(nodeData.text);
            await Figma.setNodeText(nodeData.node, finalText);
        }
    }


}
import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {Figma} from "../helpers/Figma";
import {AbstractCommand} from "./abstractions/AbstractCommand";

export class FreeWriterCommand extends AbstractCommand {

    identifier(): string {
        return "freeWriter";
    }

    containerId(): string {
        return this.identifier();
    }


    async executeAsync(request: Request): Promise<Response> {
        await FreeWriterCommand.applyChangesAsync(request);
        return this.success({
            softRefreshData: {},
            refreshDataOnView: Context.getTextNodesContainer().getAll()
        });
    }


    private static async applyChangesAsync(request: Request) {
        const finalText = request.getFromData("data") as string;
        const directionFixedText = TextDirectionFixer.fix(finalText);

        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            await Figma.setNodeTextAsync(nodeData.node, directionFixedText);
            nodeData.final_text = finalText;
        }
    }


}
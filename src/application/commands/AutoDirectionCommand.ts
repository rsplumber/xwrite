import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {Figma} from "../helpers/Figma";
import {AbstractCommand} from "../abstractions/commands/AbstractCommand";

export class AutoDirectionCommand extends AbstractCommand {

    identifier(): string {
        return "autoDirection";
    }

    async executeAsync(request: Request): Promise<Response> {
        await AutoDirectionCommand.applyChangesAsync();
        return this.success({
            notificationMessage: "Direction fixed",
            softRefreshData: {
                delay: 200
            },
            refreshDataOnView: Context.getTextNodesContainer().getAll()
        });
    }


    private static async applyChangesAsync() {
        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const finalText = TextDirectionFixer.fix(nodeData.text);
            await Figma.setNodeTextAsync(nodeData.node, finalText);
            nodeData.final_text = TextDirectionFixer.fix(finalText);
        }
    }

}
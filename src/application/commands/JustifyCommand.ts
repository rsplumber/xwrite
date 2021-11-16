import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {Figma} from "../helpers/Figma";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {AbstractCommand} from "./abstractions/AbstractCommand";

export class JustifyCommand extends AbstractCommand {

    identifier(): string {
        return "justify";
    }

    containerId(): string {
        return this.identifier();
    }


    async executeAsync(request: Request): Promise<Response> {
        if (Context.getTextNodesContainer().count() > 1) {
            return this.error({
                notificationMessage: "can't justify more than 1 text"
            });
        }

        await JustifyCommand.applyChangesAsync();

        return this.success({
            notificationMessage: "Justified",
            softRefreshData: {
                keepCurrentState: true
            }
        });
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
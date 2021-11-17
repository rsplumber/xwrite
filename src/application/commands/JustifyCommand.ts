import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {Figma} from "../helpers/Figma";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {IJustifier} from "../tools/justify/justifier/abstarctions/IJustifier";
import {Command} from "./Command";

export class JustifyCommand extends Command {

    identifier(): string {
        return "justify";
    }

    async executeAsync(request: Request): Promise<Response> {
        if (this.getTextNodeContainer().count() > 1) {
            return this.error({
                notificationMessage: "can't justify more than 1 text"
            });
        }

        await this.applyChangesAsync();

        return this.success({
            notificationMessage: "Justified",
            softRefreshData: {
                keepCurrentState: true
            }
        });
    }

    private async applyChangesAsync() {
        const justifierId = "spaceJustify";
        const justifier = Context.resolve<IJustifier>(justifierId);
        if (justifier == null) return;

        const nodeData = this.getTextNodeContainer().first();
        const maxWidth = nodeData.node.width;
        const justifiedText = await justifier.justifyAsync(nodeData, maxWidth);
        const directionFixedText = TextDirectionFixer.fix(justifiedText);
        await Figma.setNodeTextAsync(nodeData.node, directionFixedText);
    }


}
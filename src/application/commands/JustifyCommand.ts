import {Response} from "../../core/Response";
import {Request} from "../../core/Request";
import {Context} from "../Context";
import {FigmaHelper} from "../../helpers/FigmaHelper";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";
import {IJustifier} from "../../tools/justify/justifier/abstarctions/IJustifier";
import {Command} from "./Command";
import {IJustifyCalculator} from "../../tools/justify/calculators/abstractions/IJustifyCalculator";

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

        return await this.applyChangesAsync(request);
    }

    private async applyChangesAsync(request: Request): Promise<Response> {

        const justifyType = request.getFromViewData('justifyType') as string;
        const justifier = Context.resolve<IJustifier>(justifyType);
        if (justifier == null) return;

        const nodeData = this.getTextNodeContainer().first();
        const justifyCalculator = Context.resolve<IJustifyCalculator>("justifyCalculator");
        const justifiedText = await justifier.justifyAsync(nodeData, justifyCalculator);
        const directionFixedText = TextDirectionFixer.fix(justifiedText);
        await FigmaHelper.setNodeTextAsync(nodeData.node, directionFixedText);

        return this.success({
            notificationMessage: "Justified",
            softRefreshData: {
                keepCurrentState: true
            }
        });
    }


}
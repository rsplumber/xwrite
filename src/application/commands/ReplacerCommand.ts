import {Response} from "../../core/Response";
import {Request} from "../../core/Request";
import {Context} from "../Context";
import {FigmaHelper} from "../../helpers/FigmaHelper";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";
import {IReplacer} from "../../tools/replacers/abstractions/IReplacer";
import {Command} from "./Command";

export class ReplacerCommand extends Command {

    private static getReplacerType(replaceFrom): string {
        switch (replaceFrom) {
            case "*.*":
                return "replaceAllReplacer";
            default:
                return "standardReplacer";
        }
    }

    identifier(): string {
        return "replacer";
    }

    async executeAsync(request: Request): Promise<Response> {

        const replaceFrom = request.getFromViewData('replace_from') as string;
        const replaceTo = request.getFromViewData('replace_to') as string;

        if (this.getTextNodeContainer().count() === 0) {
            await Context.executeRequestInPipelineAsync(Request.generate("nodeDetector")
                .findInPage(replaceFrom));
        }

        return await this.applyChangesAsync(replaceFrom, replaceTo);
    }

    private async applyChangesAsync(replaceFrom: string, replaceTo: string): Promise<Response> {

        const replacerType = ReplacerCommand.getReplacerType(replaceFrom);
        const replacer = Context.resolve<IReplacer>(replacerType);

        for (const nodeData of this.getTextNodeContainer().getAll()) {
            const replacedText = replacer.replace(nodeData, replaceFrom, replaceTo);
            await FigmaHelper.setNodeTextAsync(nodeData.node, replacedText);
            nodeData.finalText = TextDirectionFixer.fix(replacedText);
        }

        return this.success({
            notificationMessage: "Replaced",
            hardRefreshData: {delay: 500},
            refreshDataOnView: this.getTextNodeContainer().getAll()
        });
    }

}
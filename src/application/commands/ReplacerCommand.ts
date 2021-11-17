import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {Figma} from "../helpers/Figma";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {IReplacer} from "../tools/replacers/abstractions/IReplacer";
import {Command} from "./Command";

export class ReplacerCommand extends Command {

    identifier(): string {
        return "replacer";
    }

    async executeAsync(request: Request): Promise<Response> {

        const replaceFrom = request.getFromData("data")['replace_from'] as string;
        const replaceTo = request.getFromData("data")['replace_to'] as string;

        if (this.getTextNodeContainer().count() === 0) {
            await Context.executeRequestInPipelineAsync(Request.generate("nodeDetector")
                .findInPage(replaceFrom));
        }
        await this.applyChangesAsync(replaceFrom, replaceTo);

        return this.success({
            notificationMessage: "Replaced",
            hardRefreshData: {delay: 500},
            refreshDataOnView: this.getTextNodeContainer().getAll()
        });
    }

    private async applyChangesAsync(replaceFrom: string, replaceTo: string) {

        const replacerType = ReplacerCommand.getReplacerType(replaceFrom);
        const replacer = Context.resolve<IReplacer>(replacerType);

        for (const nodeData of this.getTextNodeContainer().getAll()) {
            const replacedText = replacer.replace(nodeData, replaceFrom, replaceTo);
            await Figma.setNodeTextAsync(nodeData.node, replacedText);
            nodeData.finalText = TextDirectionFixer.fix(replacedText);
        }

    }

    private static getReplacerType(replaceFrom): string {
        switch (replaceFrom) {
            case "*.*":
                return "replaceAllReplacer";
            default:
                return "standardReplaceReplacer";
        }
    }

}
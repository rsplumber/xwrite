import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {Figma} from "../helpers/Figma";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {AbstractCommand} from "../abstractions/commands/AbstractCommand";
import {Factories} from "../factories/Factories";

export class ReplacerCommand extends AbstractCommand {

    identifier(): string {
        return "replacer";
    }

    async executeAsync(request: Request): Promise<Response> {

        const replaceFrom = request.getFromData("data")['replace_from'] as string;
        const replaceTo = request.getFromData("data")['replace_to'] as string;

        if (Context.getTextNodesContainer().count() === 0) {
            await Context.executeRequestInPipelineAsync(Request.generate("nodeDetector")
                .findInPage(replaceFrom));
        }
        await ReplacerCommand.applyChangesAsync(replaceFrom, replaceTo);

        return this.success({
            notificationMessage: "Replaced",
            hardRefreshData: {delay: 500},
            refreshDataOnView: Context.getTextNodesContainer().getAll()
        });
    }

    private static async applyChangesAsync(replaceFrom: string, replaceTo: string) {
        let replacer = Factories.Replacers(replaceFrom);

        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const replacedText = replacer.replace(nodeData, replaceFrom, replaceTo);
            await Figma.setNodeTextAsync(nodeData.node, replacedText);
            nodeData.final_text = TextDirectionFixer.fix(replacedText);
        }

    }

}
import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {CommandExecutor} from "./abstractions/CommandExecutor";
import {AbstractJustifier} from "../justifiers/abstarctions/AbstractJustifier";

export class JustifyCommand extends AbstractCommand {

    identifier(): string {
        return "justify";
    }

    async executeAsync(request: Request): Promise<Response> {
        console.log("Justify");
        if (Context.getTextNodesContainer().getAll().length === 0) {
            await CommandExecutor.executeAsync(Context.generateRequest("nodeDetector")
                .attachToData("findInPage", true));
        }
        await JustifyCommand.applyChangesAsync(request);
        return Context.responseGenerator(true)
            .setNotificationMessage("Justified")
            .refreshData()
            .generate();
    }

    private static async applyChangesAsync(request: Request) {
        const justifierId = "ltr_word_justify";
        const justifier = JustifyCommand.getJustifier(justifierId);
        if (justifier == null) return;
        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const lines = nodeData.text.split("\n")
            let maxWidth = lines[0].length as number;
            nodeData.text.split("\n").forEach(value => {
                if (value.length >= maxWidth) {
                    maxWidth = value.length;
                }
            })
            await figma.loadFontAsync(nodeData.node.fontName as FontName);
            await justifier.justifyAsync(nodeData, maxWidth);
        }
    }

    private static getJustifier(id: string): AbstractJustifier {
        return Context.getJustifierContainer().getById(id);
    }


}
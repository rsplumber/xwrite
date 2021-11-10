import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {CommandExecutor} from "./abstractions/CommandExecutor";
import {AbstractJustifier} from "../justifiers/abstarctions/AbstractJustifier";
import {Figma} from "../helpers/Figma";

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
        const justifierId = "space_justify";
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
            const words = nodeData.text.split("\n").join(" ").split(" ");
            const justifiedText = await justifier.justifyAsync(words, maxWidth);
            await Figma.setNodeText(nodeData.node, justifiedText);
        }
    }

    private static getJustifier(id: string): AbstractJustifier {
        return Context.getJustifierContainer().getById(id);
    }


}
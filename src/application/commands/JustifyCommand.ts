import {ICommand} from "./abstractions/ICommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {CommandExecutor} from "./abstractions/CommandExecutor";
import {Figma} from "../helpers/Figma";
import {JustifiersContainer} from "../containers/JustifiersContainer";

export class JustifyCommand implements ICommand {

    identifier(): string {
        return "justify";
    }

    containerId(): string {
        return this.identifier();
    }


    async executeAsync(request: Request): Promise<Response> {
        if (Context.getTextNodesContainer().getAll().length === 0) {
            await CommandExecutor.executeAsync(Request.generate("nodeDetector")
                .attachToData("findInPage", true));
        }
        await JustifyCommand.applyChangesAsync(request);
        return Response.generator(true)
            .setNotificationMessage("Justified")
            .refreshData()
            .generate();
    }

    private static async applyChangesAsync(request: Request) {
        const justifierId = "space_justify";
        const justifier = JustifiersContainer.getInstance().getById(justifierId);
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

}
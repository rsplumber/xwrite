import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";

export class FreeWriterCommand extends AbstractCommand {

    identifier(): string {
        return "freeWriter";
    }

    async executeAsync(request: Request): Promise<Response> {
        await FreeWriterCommand.applyChangesAsync(request);
        return Context.responseGenerator(true)
            .generate();
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private static async applyChangesAsync(request: Request) {
        const finalText = request.getFromData("data") as string;
        const directionFixedText = TextDirectionFixer.fix(finalText);

        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            const textNode = nodeData.node as TextNode;
            await figma.loadFontAsync(textNode.fontName as FontName);
            textNode.characters = directionFixedText;
        }
    }


}
import {AbstractCommand} from "../abstractions/AbstractCommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {Context} from "../../Context";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";

export class FreeWriterCommand extends AbstractCommand {


    execute(request: Request): Response {
        const finalText = request.getValue("data") as string;
        const directionFixedText = TextDirectionFixer.fix(finalText);
        Context.getTextNodesContainer().getAll().forEach(async nodeData => {
            const textNode = nodeData.node as TextNode;
            await figma.loadFontAsync(textNode.fontName as FontName);
            textNode.characters = directionFixedText;
        });
        this.delay(1000).then(_ => {
            Context.executeRequest(Context.generateRequest("nodeDetector"));
        });

        return Context.responseGenerator(true)
            .generate();
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    identifier(): string {
        return "freeWriter";
    }


}
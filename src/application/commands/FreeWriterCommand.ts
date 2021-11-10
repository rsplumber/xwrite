import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {Figma} from "../helpers/Figma";

export class FreeWriterCommand extends AbstractCommand {

    identifier(): string {
        return "freeWriter";
    }

    async executeAsync(request: Request): Promise<Response> {
        await FreeWriterCommand.applyChangesAsync(request);
        return Response.generator(true)
            .refreshData(1000)
            .generate();
    }


    private static async applyChangesAsync(request: Request) {
        const finalText = request.getFromData("data") as string;
        const directionFixedText = TextDirectionFixer.fix(finalText);

        for (const nodeData of Context.getTextNodesContainer().getAll()) {
            await Figma.setNodeText(nodeData.node, directionFixedText);
        }
    }


}
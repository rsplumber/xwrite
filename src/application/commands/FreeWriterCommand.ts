import {ICommand} from "./abstractions/ICommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {Figma} from "../helpers/Figma";

export class FreeWriterCommand implements ICommand {

    identifier(): string {
        return "freeWriter";
    }

    containerId(): string {
        return this.identifier();
    }


    async executeAsync(request: Request): Promise<Response> {
        await FreeWriterCommand.applyChangesAsync(request);
        return Response.generator()
            .refreshData(500)
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
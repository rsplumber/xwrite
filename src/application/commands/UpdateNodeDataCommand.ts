import {ICommand} from "./abstractions/ICommand";
import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";

export class UpdateNodeDataCommand implements ICommand {

    identifier(): string {
        return "updateNodeData";
    }

    containerId(): string {
        return this.identifier();
    }


    async executeAsync(request: Request): Promise<Response> {
        const keepCurrentState = request.getFromData("keepCurrentState") as boolean;
        if (keepCurrentState) {
            return Response.generator()
                .addEventOnUi("detect_texts", Context.getTextNodesContainer().getAll())
                .generate();
        }

        for (const dataNode of Context.getTextNodesContainer().getAll()) {
            dataNode.text = dataNode.final_text;
            dataNode.final_text = "";
        }

        return Response.generator()
            .addEventOnUi("detect_texts", Context.getTextNodesContainer().getAll())
            .generate();
    }

}
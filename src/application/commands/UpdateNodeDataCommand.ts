import {ICommand} from "./abstractions/ICommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class UpdateNodeDataCommand implements ICommand {

    identifier(): string {
        return "updateNodeData";
    }

    containerId(): string {
        return this.identifier();
    }


    async executeAsync(request: Request): Promise<Response> {

        Context.getTextNodesContainer().getAll().map(value => {
            value.text = value.final_text;
            value.final_text = "";
        });

        return Response.generator()
            .addEventOnUi("detect_texts", Context.getTextNodesContainer().getAll())
            .generate();
    }

}
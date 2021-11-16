import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {AbstractCommand} from "./abstractions/AbstractCommand";

export class UpdateNodeDataCommand extends AbstractCommand {

    identifier(): string {
        return "updateNodeData";
    }

    containerId(): string {
        return this.identifier();
    }


    async executeAsync(request: Request): Promise<Response> {
        const keepCurrentState = request.getFromData("keepCurrentState") as boolean;
        if (!keepCurrentState) {
            for (const dataNode of Context.getTextNodesContainer().getAll()) {
                dataNode.text = dataNode.final_text;
                dataNode.final_text = "";
            }
        }
        return this.success({
            refreshDataOnView: Context.getTextNodesContainer().getAll()
        })
    }

}
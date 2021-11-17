import {Response} from "../../core/Response";
import {Request} from "../../core/Request";
import {Command} from "./Command";

export class UpdateNodeDataCommand extends Command {

    identifier(): string {
        return "updateNodeData";
    }

    async executeAsync(request: Request): Promise<Response> {
        const keepCurrentState = request.getFromData("keepCurrentState") as boolean;
        if (!keepCurrentState) {
            for (const dataNode of this.getTextNodeContainer().getAll()) {
                dataNode.text = dataNode.finalText;
                dataNode.finalText = "";
            }
        }
        return this.success({
            refreshDataOnView: this.getTextNodeContainer().getAll()
        })
    }

}
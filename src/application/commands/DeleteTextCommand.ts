import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {TextNodeData} from "../../shared/TextNodeData";

export class DeleteTextCommand extends AbstractCommand {

    identifier(): string {
        return "deleteText";
    }

    async execute(request: Request): Promise<Response> {
        const textNodeId = request.getValue("data") as string;
        const textNode = Context.getTextNodesContainer().getById(textNodeId) as TextNodeData;
        textNode.node.remove();
        return Context.responseGenerator(true)
            .setNotificationMessage("Text removed")
            .refreshData()
            .generate();
    }


}
import {AbstractCommand} from "../abstractions/AbstractCommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {Context} from "../../Context";
import {TextNodeData} from "../../../shared/TextNodeData";

export class DeleteTextCommand extends AbstractCommand {

    execute(request: Request): Response {

        const textNodeId = request.getValue("data") as string;
        console.log(textNodeId);
        const textNode = Context.getTextNodesContainer().getById(textNodeId) as TextNodeData;
        console.log(textNode);
        textNode.node.remove();

        return Context.responseGenerator(true)
            .setNotificationMessage("Text removed")
            .refreshData()
            .generate();
    }

    identifier(): string {
        return "deleteText";
    }


}
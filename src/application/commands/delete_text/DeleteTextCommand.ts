import {ICommand} from "../abstraction/ICommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {Context} from "../../Context";
import {TextNodeData} from "../../../shared/TextNodeData";

export class DeleteTextCommand implements ICommand {
    identifier(): string {
        return "deleteText";
    }

    execute(request: Request): Response {

        const textNodeId = request.data['text_node_id'] as string;
        const textNode = Context.getTextNodesContainer().getById(textNodeId) as TextNodeData;
        textNode.node.remove();

        // postDetectMessage();?

        return undefined;
    }


}
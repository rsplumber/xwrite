import {ICommand} from "../abstraction/ICommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {Context} from "../../Context";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";

export class CopyTextCommand implements ICommand {
    identifier(): string {
        return "copyText";
    }

    execute(request: Request): Response {

        const textNodeId = request.data['text_node_id'] as string;

        Context.getTextNodesContainer()
            .getAll()
            .filter(value => value.id == textNodeId)
            .forEach(value => {
            value.final_text = value.text;
            });

        // postDetectMessage();?

        return undefined;
    }


}
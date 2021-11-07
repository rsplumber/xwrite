import {AbstractCommand} from "../abstractions/AbstractCommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {Context} from "../../Context";

export class MoveTextCommand extends AbstractCommand {


    async execute(request: Request): Promise<Response> {
        const textNodeId = request.getValue("data") as string;

        Context.getTextNodesContainer()
            .getAll()
            .filter(value => value.id == textNodeId)
            .map(value => {
                value.final_text = value.text;
            });

        return Context.responseGenerator(true)
            .eventOnUi("detect_texts", Context.getTextNodesContainer().getAll())
            .setNotificationMessage("Text moved")
            .generate();
    }

    identifier(): string {
        return "moveText";
    }


}
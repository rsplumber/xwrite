import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class MoveTextCommand extends AbstractCommand {

    identifier(): string {
        return "moveText";
    }

    async executeAsync(request: Request): Promise<Response> {
        const textNodeId = request.getFromData("data") as string;

        Context.getTextNodesContainer()
            .getAll()
            .filter(value => value.id == textNodeId)
            .map(value => {
                value.final_text = value.text;
            });

        return Response.generator()
            .addEventOnUi("detect_texts", Context.getTextNodesContainer().getAll())
            .setNotificationMessage("Text moved")
            .generate();
    }



}
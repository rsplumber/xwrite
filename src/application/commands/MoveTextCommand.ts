import {Response} from "../../core/Response";
import {Request} from "../../core/Request";
import {Command} from "./Command";

export class MoveTextCommand extends Command {

    identifier(): string {
        return "moveText";
    }

    async executeAsync(request: Request): Promise<Response> {
        const textNodeId = request.getFromViewData("textId") as string;

        this.getTextNodeContainer()
            .getAll()
            .filter(value => value.id == textNodeId)
            .map(value => {
                value.finalText = value.text;
            });


        return this.success({
            notificationMessage: "Text moved",
            refreshDataOnView: this.getTextNodeContainer().getAll()
        });
    }


}
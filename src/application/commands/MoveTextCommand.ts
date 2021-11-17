import {Response} from "../Response";
import {Request} from "../Request";
import {Command} from "./Command";

export class MoveTextCommand extends Command {

    identifier(): string {
        return "moveText";
    }

    async executeAsync(request: Request): Promise<Response> {
        const textNodeId = request.getFromData("data") as string;

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
import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {AbstractCommand} from "../abstractions/commands/AbstractCommand";

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


        return this.success({
            notificationMessage: "Text moved",
            refreshDataOnView: Context.getTextNodesContainer().getAll()
        });
    }


}
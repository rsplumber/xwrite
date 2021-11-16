import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {AbstractCommand} from "../abstractions/commands/AbstractCommand";

export class DeleteTextCommand extends AbstractCommand {

    identifier(): string {
        return "deleteText";
    }


    async executeAsync(request: Request): Promise<Response> {
        const textNodeId = request.getFromData("data") as string;
        Context.getTextNodesContainer().removeById(textNodeId);
        figma.currentPage.selection = Context.getTextNodesContainer().getAll().map(value => value.node) as TextNode[];

        return this.success({
            notificationMessage: "Text removed",
            softRefreshData: {
                keepCurrentState: true
            },
            refreshDataOnView: Context.getTextNodesContainer().getAll()
        });
    }
}
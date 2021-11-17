import {Response} from "../Response";
import {Request} from "../Request";
import {Command} from "./Command";

export class DeleteTextCommand extends Command {

    identifier(): string {
        return "deleteText";
    }


    async executeAsync(request: Request): Promise<Response> {
        const textNodeId = request.getFromData("data") as string;
        this.getTextNodeContainer().removeById(textNodeId);
        figma.currentPage.selection = this.getTextNodeContainer().getAll().map(value => value.node) as TextNode[];

        return this.success({
            notificationMessage: "Text removed",
            softRefreshData: {
                keepCurrentState: true
            },
            refreshDataOnView: this.getTextNodeContainer().getAll()
        });
    }
}
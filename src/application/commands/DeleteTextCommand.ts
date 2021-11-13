import {ICommand} from "./abstractions/ICommand";
import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";

export class DeleteTextCommand implements ICommand {

    identifier(): string {
        return "deleteText";
    }

    containerId(): string {
        return this.identifier();
    }


    async executeAsync(request: Request): Promise<Response> {
        const textNodeId = request.getFromData("data") as string;
        Context.getTextNodesContainer().removeById(textNodeId);
        figma.currentPage.selection = Context.getTextNodesContainer().getAll().map(value => value.node) as TextNode[];
        return Response.generator()
            .setNotificationMessage("Text removed")
            .softRefreshData(0 , null,true)
            .generate();
    }
}
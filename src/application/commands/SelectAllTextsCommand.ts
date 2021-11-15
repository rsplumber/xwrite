import {ICommand} from "./abstractions/ICommand";
import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";

export class SelectAllTextsCommand implements ICommand {

    identifier(): string {
        return "selectAllTexts";
    }

    containerId(): string {
        return this.identifier();
    }


    async executeAsync(request: Request): Promise<Response> {
        await Context.executeRequestInPipelineAsync(Request.generate("nodeDetector").findInPage());
        return Response.generator()
            .setNotificationMessage("all texts selected")
            .generate();
    }


}
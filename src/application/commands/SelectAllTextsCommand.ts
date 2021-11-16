import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {AbstractCommand} from "./abstractions/AbstractCommand";

export class SelectAllTextsCommand extends AbstractCommand {

    identifier(): string {
        return "selectAllTexts";
    }

    containerId(): string {
        return this.identifier();
    }


    async executeAsync(request: Request): Promise<Response> {
        await Context.executeRequestInPipelineAsync(Request.generate("nodeDetector").findInPage());
        return this.success({
            notificationMessage: "All texts selected"
        });
    }


}
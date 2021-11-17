import {Response} from "../Response";
import {Request} from "../Request";
import {Context} from "../Context";
import {Command} from "./Command";

export class SelectAllTextsCommand extends Command {

    identifier(): string {
        return "selectAllTexts";
    }

    async executeAsync(request: Request): Promise<Response> {
        await Context.executeRequestInPipelineAsync(Request.generate("nodeDetector").findInPage());
        return this.success({
            notificationMessage: "All texts selected"
        });
    }


}
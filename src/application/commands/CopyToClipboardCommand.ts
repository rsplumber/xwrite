import {Response} from "../../core/Response";
import {Request} from "../../core/Request";
import {Command} from "./Command";

export class CopyToClipboardCommand extends Command {

    identifier(): string {
        return "copyToClipboard";
    }

    async executeAsync(request: Request): Promise<Response> {
        return this.success({
            notificationMessage: "copied to clipboard"
        })
    }


}
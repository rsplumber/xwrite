import {Response} from "../Response";
import {Request} from "../Request";
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
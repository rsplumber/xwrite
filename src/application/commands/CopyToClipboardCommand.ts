import {Response} from "../Response";
import {Request} from "../Request";
import {AbstractCommand} from "../abstractions/commands/AbstractCommand";

export class CopyToClipboardCommand extends AbstractCommand {

    identifier(): string {
        return "copyToClipboard";
    }

    async executeAsync(request: Request): Promise<Response> {
        return this.success({
            notificationMessage: "copied to clipboard"
        })
    }


}
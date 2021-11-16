import {Response} from "../Response";
import {Request} from "../Request";
import {AbstractCommand} from "./abstractions/AbstractCommand";

export class CopyToClipboardCommand extends AbstractCommand {

    identifier(): string {
        return "copyToClipboard";
    }

    containerId(): string {
        return this.identifier();
    }

    async executeAsync(request: Request): Promise<Response> {
        return this.success({
            notificationMessage: "copied to clipboard"
        })
    }


}
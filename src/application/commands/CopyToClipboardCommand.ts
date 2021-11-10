import {ICommand} from "./abstractions/ICommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";

export class CopyToClipboardCommand implements ICommand {

    identifier(): string {
        return "copyToClipboard";
    }

    containerId(): string {
        return this.identifier();
    }

    async executeAsync(request: Request): Promise<Response> {
        const textToCopy = request.getFromData("data") as string;
        return Response.generator()
            .setNotificationMessage("copied to clipboard")
            .generate();
    }


}
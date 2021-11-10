import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {Context} from "../Context";

export class CopyToClipboardCommand extends AbstractCommand {

    identifier(): string {
        return "copyToClipboard";
    }

    async executeAsync(request: Request): Promise<Response> {
        const textToCopy = request.getFromData("data") as string;
        return Response.generator()
            .setNotificationMessage("copied to clipboard")
            .generate();
    }


}
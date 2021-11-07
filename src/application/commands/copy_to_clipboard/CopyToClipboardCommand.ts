import {AbstractCommand} from "../abstractions/AbstractCommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {Context} from "../../Context";

export class CopyToClipboardCommand extends AbstractCommand {

    identifier(): string {
        return "copyToClipboard";
    }

    async execute(request: Request): Promise<Response> {
        const textToCopy = request.getValue("data") as string;
        return Context.responseGenerator(true)
            .setNotificationMessage("Copy to clipboard")
            .generate();
    }


}
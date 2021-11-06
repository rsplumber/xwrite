import {AbstractCommand} from "../abstractions/AbstractCommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {Context} from "../../Context";

export class CopyToClipboardCommand extends AbstractCommand {

    execute(request: Request): Response {

        console.log("Here")
        const textToCopy = request.getValue("data") as string;
        return Context.responseGenerator(true)
            .setNotificationMessage("Copy to clipboard")
            .generate();
    }

    identifier(): string {
        return "copyToClipboard";
    }


}
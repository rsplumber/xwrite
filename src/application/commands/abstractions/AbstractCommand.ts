import {Request} from "../../../shared/Request";
import {Response} from "../../../shared/Response";

export abstract class AbstractCommand {

    abstract execute(request: Request): Response;

    abstract identifier(): string;

    public autoIdentifier(): string {
        return this.constructor.name.replace("Command", "");
    }
}
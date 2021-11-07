import {Request} from "../../../shared/Request";
import {Response} from "../../../shared/Response";

export abstract class AbstractCommand {

    abstract executeAsync(request: Request): Promise<Response>;

    abstract identifier(): string;

    public autoIdentifier(): string {
        return this.constructor.name.replace("Command", "");
    }
}
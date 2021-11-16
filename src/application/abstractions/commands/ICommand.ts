import {Request} from "../../Request";
import {Response} from "../../Response";

export interface ICommand {

    identifier(): string;

    executeAsync(request: Request): Promise<Response>;

}
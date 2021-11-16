import {Request} from "../../Request";
import {Response} from "../../Response";
import {IContainerable} from "../../containers/abstractions/IContainerable";

export interface ICommand extends IContainerable {

    identifier(): string;

    executeAsync(request: Request): Promise<Response>;

}
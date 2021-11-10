import {Request} from "../../../shared/Request";
import {Response} from "../../../shared/Response";
import {IContainerable} from "../../containers/abstractions/IContainerable";

export interface ICommand extends IContainerable {

    executeAsync(request: Request): Promise<Response>;

    identifier(): string;
}
import {Request} from "../../../shared/Request";
import {Response} from "../../../shared/Response";

export interface ICommand{

    execute(request : Request): Response;

    identifier(): string;
}
import {Request} from "../../../shared/Request";
import {Response} from "../../../shared/Response";

export interface IFilter {
    setNext(handler: IFilter): IFilter;

    handle(request: Request): Response;
}

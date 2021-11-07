import {Request} from "../../../shared/Request";

export interface IFilter {

    setNext(handler: IFilter): IFilter;

    handle(request: Request): Promise<void>;
}

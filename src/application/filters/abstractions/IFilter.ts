import {Request} from "../../../shared/Request";

export interface IFilter {

    setNext(handler: IFilter): IFilter;

    handleAsync(request: Request): Promise<void>;
}

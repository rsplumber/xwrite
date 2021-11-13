import {Request} from "../../Request";
import {Response} from "../../Response";

export interface IFilter {

    setNext(handler: IFilter): IFilter;

    handleAsync(request: Request, response: Response): Promise<void>;

}

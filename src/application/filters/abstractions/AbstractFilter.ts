import {IFilter} from './IFilter';
import {Request} from "../../../shared/Request";
import {Response} from "../../../shared/Response";

export abstract class AbstractFilter implements IFilter {
    private nextHandler: IFilter;

    public setNext(handler: IFilter): IFilter {
        this.nextHandler = handler;
        return handler;
    }

    public async handleAsync(request: Request, response: Response): Promise<void> {
        if (request.canceled || !this.nextHandler) return null;
        await this.nextHandler.handleAsync(request, response);
    }

    abstract order(): number;

    disabled(): boolean {
        return false;
    };


}
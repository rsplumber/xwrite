import {IFilter} from './IFilter';
import {Request} from "../../../shared/Request";
import {Response} from "../../../shared/Response";

export abstract class AbstractFilter implements IFilter {
    private nextHandler: IFilter;

    public setNext(handler: IFilter): IFilter {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: Request): Response {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }

    abstract order(): number;


}
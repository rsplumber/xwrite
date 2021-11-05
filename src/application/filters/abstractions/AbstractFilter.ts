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
        if (request.canceled || !this.nextHandler) return null;
        return this.nextHandler.handle(request);
    }

    abstract order(): number;

    disabled(): boolean {
        return false;
    };


}
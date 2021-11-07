import {IFilter} from './IFilter';
import {Request} from "../../../shared/Request";

export abstract class AbstractFilter implements IFilter {
    private nextHandler: IFilter;

    public setNext(handler: IFilter): IFilter {
        this.nextHandler = handler;
        return handler;
    }

    public async handle(request: Request): Promise<void> {
        if (request.canceled || !this.nextHandler) return null;
        await this.nextHandler.handle(request);
    }

    abstract order(): number;

    disabled(): boolean {
        return false;
    };


}
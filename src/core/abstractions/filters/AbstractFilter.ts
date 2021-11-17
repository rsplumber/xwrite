import {IFilter} from './IFilter';
import {Request} from "../../Request";
import {Response} from "../../Response";
import {Settings} from "../../Settings";

export abstract class AbstractFilter implements IFilter {

    private readonly order: number;
    private nextHandler: IFilter;

    protected constructor(order: number) {
        this.order = order;
    }

    public setNext(handler: IFilter): IFilter {
        this.nextHandler = handler;
        return handler;
    }

    public async handleAsync(request: Request, response: Response): Promise<void> {
        this.logPipeline(request, response);
        if (!this.nextHandler || request.canceled) {
            response.success = false;
            response.message = "Request canceled";
            return null;
        }
        await this.nextHandler.handleAsync(request, response);
    }

    disabled(): boolean {
        return false;
    };

    public getOrder(): number {
        return this.order;
    }

    protected abstract name(): string;

    private logPipeline(request: Request, response: Response) {
        if (!Settings.isDebugMode) return;
        console.log("***********PIPELINE**********************")
        console.log("filter name: " + this.name());
        console.log("filter order: " + this.order);
        console.log("filter disabled: " + this.disabled());
        console.log("-----------REQUEST-----------------------")
        console.log("request command: " + request.commandIdentifier);
        console.log("request data: " + JSON.stringify(request.data));
        console.log("request type: " + request.type);
        console.log("-----------RESPONSE-----------------------")
        console.log("response success: " + response.success);
        console.log("response message: " + response.message);
        console.log("response data: " + JSON.stringify(response.data));
        console.log("------------------------------------------")
    }


}
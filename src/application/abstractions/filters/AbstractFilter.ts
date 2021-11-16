import {IFilter} from './IFilter';
import {Request} from "../../Request";
import {Response} from "../../Response";
import {Context} from "../../Context";

export abstract class AbstractFilter implements IFilter {
    private nextHandler: IFilter;

    public setNext(handler: IFilter): IFilter {
        this.nextHandler = handler;
        return handler;
    }

    public async handleAsync(request: Request, response: Response): Promise<void> {
        this.logPipeline(request, response);
        if (request.canceled || !this.nextHandler) return null;
        await this.nextHandler.handleAsync(request, response);
    }

    abstract order(): number;

    disabled(): boolean {
        return false;
    };

    abstract identifier(): string;

    private logPipeline(request: Request, response: Response) {
        if (!Context.isDebugMode()) return;
        console.log("***********PIPELINE**********************")
        console.log("filter name: " + this.identifier());
        console.log("filter order: " + this.order());
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
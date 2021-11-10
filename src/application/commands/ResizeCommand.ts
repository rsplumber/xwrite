import {ICommand} from "./abstractions/ICommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";

export class ResizeCommand implements ICommand {

    identifier(): string {
        return "resize";
    }

    containerId(): string {
        return this.identifier();
    }


    async executeAsync(request: Request): Promise<Response> {
        const resizeParam = request.getFromData("data") as string;
        switch (resizeParam) {
            case 'minimize':
                figma.ui.resize(100, 100)
                break;
            case 'standard':
                figma.ui.resize(660, 560)
                break;
            case 'fullScreen':
                figma.ui.resize(1920, 1080)
                break;
        }
        return Response.generator()
            .generate();
    }


}
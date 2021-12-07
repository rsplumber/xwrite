import {Response} from "../../core/Response";
import {Request} from "../../core/Request";
import {Command} from "./Command";

export class ResizeCommand extends Command {

    identifier(): string {
        return "resize";
    }

    async executeAsync(request: Request): Promise<Response> {
        const resizeParam = request.getFromViewData("sizeParams") as string;
        switch (resizeParam) {
            case 'minimize':
                figma.ui.resize(100, 100)
                break;
            case 'standard':
                figma.ui.resize(460, 310)
                break;
            case 'fullScreen':
                figma.ui.resize(1920, 1080)
                break;
        }
        return this.success();
    }


}
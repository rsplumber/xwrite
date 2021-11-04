import {ICommand} from "../abstraction/ICommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";

export class ResizeCommand implements ICommand {
    identifier(): string {
        return "resize";
    }

    execute(request: Request): Response {
        const resizeParam = request.data['sizeParam'] as string;
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
        return undefined;
    }
}
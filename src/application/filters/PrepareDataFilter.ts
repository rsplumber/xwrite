import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Context} from "../Context";
import {NodeDetectorCommand} from "../commands/node_detector/NodeDetectorCommand";

export class PrepareDataFilter extends AbstractFilter {
    public handle(request: Request): void {
        Context.generateRequest(NodeDetectorCommand);
        super.handle(request);
    }

    order(): number {
        return 0;
    }
}
import {AbstractFilter} from "./abstractions/AbstractFilter";
import {Request} from "../../shared/Request";
import {Response} from "../../shared/Response";
import {Context} from "../Context";
import {NodeDetectorCommand} from "../commands/node_detector/NodeDetectorCommand";

export class PrepareDataFilter extends AbstractFilter {
    public handle(request: Request): Response {
        Context.generateRequest(NodeDetectorCommand);
        return super.handle(request);
    }

    order(): number {
        return 0;
    }
}
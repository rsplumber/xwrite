import {AbstractCommand} from "../../core/abstractions/commands/AbstractCommand";
import {TextNodesContainer} from "../containers/TextNodesContainer";
import {Context} from "../Context";

export abstract class Command extends AbstractCommand {

    protected getTextNodeContainer(): TextNodesContainer {
        return Context.getTextNodesContainer();
    }

}
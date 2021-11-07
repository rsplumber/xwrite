import {AbstractReplacer} from "./abstractions/AbstractReplacer";
import {TextNodeData} from "../../shared/TextNodeData";

export class ReplaceAllReplacer extends AbstractReplacer {

    replace(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): void {
        textNodeData.node.characters = replaceTo;
    }

    sign(): string {
        return "*.*";
    }

}
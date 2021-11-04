import {IReplacer} from "./IReplacer";
import {TextNodeData} from "../../../shared/TextNodeData";

export class ReplaceAllReplacer implements IReplacer {

    replace(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): void {
        textNodeData.node.characters = replaceTo;
    }

    sign(): string {
        return "*.*";
    }

}
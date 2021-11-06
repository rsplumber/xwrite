import {AbstractReplacer} from "./AbstractReplacer";
import {TextNodeData} from "../../../shared/TextNodeData";

export class StandardReplaceReplacer extends AbstractReplacer {

    replace(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): void {
        if (!textNodeData.text.includes(replaceFrom)) return;
        const needToReplace = textNodeData.text;
        textNodeData.node.characters = needToReplace.replace(new RegExp(replaceFrom, 'g'), replaceTo);
    }

    sign(): string {
        return "$__standard";
    }

}
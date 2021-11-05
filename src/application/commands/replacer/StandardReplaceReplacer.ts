import {AbstractReplacer} from "./AbstractReplacer";
import {TextNodeData} from "../../../shared/TextNodeData";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";

export class StandardReplaceReplacer extends AbstractReplacer {

    replace(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): void {
        if (!textNodeData.text.includes(replaceFrom)) return;
        const needToReplace = textNodeData.text;
        const directionFixedText = TextDirectionFixer.fix(needToReplace);
        textNodeData.node.characters = needToReplace.replace(new RegExp(replaceFrom, 'g'), directionFixedText);
    }

    sign(): string {
        return "$__standard";
    }

}
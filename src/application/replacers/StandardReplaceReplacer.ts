import {AbstractReplacer} from "./abstractions/AbstractReplacer";
import {TextNodeData} from "../../shared/TextNodeData";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";

export class StandardReplaceReplacer extends AbstractReplacer {

    async replaceAsync(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): Promise<string> {
        if (!textNodeData.text.includes(replaceFrom)) return;
        const needToReplace = textNodeData.text;
        const replacedText = needToReplace.split(replaceFrom).join(replaceTo);
        return TextDirectionFixer.fix(replacedText);
    }

    sign(): string {
        return "$__standard";
    }

    // const replacedText = needToReplace.replace(new RegExp(replaceFrom, 'g'), replaceTo);

}
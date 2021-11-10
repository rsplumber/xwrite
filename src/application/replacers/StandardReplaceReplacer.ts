import {IReplacer} from "./abstractions/IReplacer";
import {TextNodeData} from "../../shared/TextNodeData";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";

export class StandardReplaceReplacer implements IReplacer {

    sign(): string {
        return "$__standard";
    }

    containerId(): string {
        return this.sign();
    }

    async replaceAsync(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): Promise<string> {
        if (!textNodeData.text.includes(replaceFrom)) return;
        const needToReplace = textNodeData.text;
        const replacedText = needToReplace.split(replaceFrom).join(replaceTo);
        return TextDirectionFixer.fix(replacedText);
    }

    // const replacedText = needToReplace.replace(new RegExp(replaceFrom, 'g'), replaceTo);

}
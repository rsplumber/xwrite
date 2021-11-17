import {IReplacer} from "./abstractions/IReplacer";
import {TextNodeData} from "../../../shared/TextNodeData";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";
import {StringHelper} from "../../helpers/StringHelper";

export class StandardReplacer implements IReplacer {

    sign(): string {
        return "standardReplacer";
    }

    replace(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): string {
        if (!textNodeData.text.includes(replaceFrom)) return;
        const needToReplace = textNodeData.text;
        const replacedText = StringHelper.replace(needToReplace, replaceFrom, replaceTo);
        return TextDirectionFixer.fix(replacedText);
    }

    // const replacedText = needToReplace.replace(new RegExp(replaceFrom, 'g'), replaceTo);

}
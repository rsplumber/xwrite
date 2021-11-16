import {IReplacer} from "./abstractions/IReplacer";
import {TextNodeData} from "../../../shared/TextNodeData";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";
import {StringHelper} from "../../helpers/StringHelper";

export class StandardReplaceReplacer implements IReplacer {

    private static instance: StandardReplaceReplacer;

    public static getInstance(): StandardReplaceReplacer {
        if (!StandardReplaceReplacer.instance) {
            StandardReplaceReplacer.instance = new StandardReplaceReplacer();
        }

        return StandardReplaceReplacer.instance;
    }


    sign(): string {
        return "$__standard";
    }

    replace(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): string {
        if (!textNodeData.text.includes(replaceFrom)) return;
        const needToReplace = textNodeData.text;
        const replacedText = StringHelper.replace(needToReplace, replaceFrom, replaceTo);
        return TextDirectionFixer.fix(replacedText);
    }

    // const replacedText = needToReplace.replace(new RegExp(replaceFrom, 'g'), replaceTo);

}
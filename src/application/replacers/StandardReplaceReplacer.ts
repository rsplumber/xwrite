import {AbstractReplacer} from "./abstractions/AbstractReplacer";
import {TextNodeData} from "../../shared/TextNodeData";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";

export class StandardReplaceReplacer extends AbstractReplacer {

    async replaceAsync(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string) {
        if (!textNodeData.text.includes(replaceFrom)) return;
        await figma.loadFontAsync(textNodeData.node.fontName as FontName);
        const needToReplace = textNodeData.text;
        const replacedText = needToReplace.replace(new RegExp(replaceFrom, 'g'), replaceTo);
        textNodeData.node.characters = TextDirectionFixer.fix(replacedText);
    }

    sign(): string {
        return "$__standard";
    }

}
import {AbstractReplacer} from "./abstractions/AbstractReplacer";
import {TextNodeData} from "../../shared/TextNodeData";

export class StandardReplaceReplacer extends AbstractReplacer {

    async replaceAsync(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string) {
        if (!textNodeData.text.includes(replaceFrom)) return;
        await figma.loadFontAsync(textNodeData.node.fontName as FontName);
        const needToReplace = textNodeData.text;
        textNodeData.node.characters = needToReplace.replace(new RegExp(replaceFrom, 'g'), replaceTo);
    }

    sign(): string {
        return "$__standard";
    }

}
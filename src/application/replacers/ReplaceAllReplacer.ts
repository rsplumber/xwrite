import {AbstractReplacer} from "./abstractions/AbstractReplacer";
import {TextNodeData} from "../../shared/TextNodeData";

export class ReplaceAllReplacer extends AbstractReplacer {

    async replaceAsync(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string){
        await figma.loadFontAsync(textNodeData.node.fontName as FontName);
        textNodeData.node.characters = replaceTo;
    }

    sign(): string {
        return "*.*";
    }

}
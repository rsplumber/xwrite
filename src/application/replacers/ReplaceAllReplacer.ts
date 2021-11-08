import {AbstractReplacer} from "./abstractions/AbstractReplacer";
import {TextNodeData} from "../../shared/TextNodeData";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";

export class ReplaceAllReplacer extends AbstractReplacer {

    async replaceAsync(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string){
        await figma.loadFontAsync(textNodeData.node.fontName as FontName);
        textNodeData.node.characters =  TextDirectionFixer.fix(replaceTo);
    }

    sign(): string {
        return "*.*";
    }

}
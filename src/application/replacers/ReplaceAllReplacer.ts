import {AbstractReplacer} from "./abstractions/AbstractReplacer";
import {TextNodeData} from "../../shared/TextNodeData";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";

export class ReplaceAllReplacer extends AbstractReplacer {

    async replaceAsync(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): Promise<string> {
        return TextDirectionFixer.fix(replaceTo);
    }

    sign(): string {
        return "*.*";
    }

}
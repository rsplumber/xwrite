import {IReplacer} from "./abstractions/IReplacer";
import {TextNodeData} from "../../shared/TextNodeData";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";

export class ReplaceAllReplacer implements IReplacer {

    sign(): string {
        return "*.*";
    }

    containerId(): string {
        return this.sign();
    }

    async replaceAsync(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): Promise<string> {
        return TextDirectionFixer.fix(replaceTo);
    }

}
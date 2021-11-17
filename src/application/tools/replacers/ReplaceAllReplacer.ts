import {IReplacer} from "./abstractions/IReplacer";
import {TextNodeData} from "../../../shared/TextNodeData";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";

export class ReplaceAllReplacer implements IReplacer {

    sign(): string {
        return "replaceAllReplacer";
    }

    replace(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): string {
        return TextDirectionFixer.fix(replaceTo);
    }

}
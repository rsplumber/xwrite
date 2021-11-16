import {IReplacer} from "./abstractions/IReplacer";
import {TextNodeData} from "../../../shared/TextNodeData";
import {TextDirectionFixer} from "../../helpers/TextDirectionFixer";

export class ReplaceAllReplacer implements IReplacer {


    private static instance: ReplaceAllReplacer;

    public static getInstance(): ReplaceAllReplacer {
        if (!ReplaceAllReplacer.instance) {
            ReplaceAllReplacer.instance = new ReplaceAllReplacer();
        }

        return ReplaceAllReplacer.instance;
    }

    sign(): string {
        return "*.*";
    }

    replace(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): string {
        return TextDirectionFixer.fix(replaceTo);
    }

}
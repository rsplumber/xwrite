import {TextNodeData} from "../../../shared/TextNodeData";
import {Context} from "../../Context";

export abstract class AbstractReplacer {

    abstract replaceAsync(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): Promise<string>;

    abstract sign(): string;

    public static getBySign(sign: string): AbstractReplacer {
        const container = Context.getReplacersContainer();
        let replacer = container.getById(sign);
        if (replacer == null) {
            replacer = container.getById("$__standard");
        }
        return replacer;
    }

}
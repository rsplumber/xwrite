import {TextNodeData} from "../../../shared/TextNodeData";

export abstract class AbstractReplacer {

    abstract replaceAsync(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): Promise<string>;

    abstract sign(): string;

}
import {TextNodeData} from "../../../shared/TextNodeData";

export abstract class AbstractReplacer {

    abstract replaceAsync(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string);

    abstract sign(): string;

}
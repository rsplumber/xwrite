import {TextNodeData} from "../../../shared/TextNodeData";

export abstract class AbstractReplacer {

    abstract replace(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): void;

    abstract sign() : string;

}
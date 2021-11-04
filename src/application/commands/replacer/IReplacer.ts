import {TextNodeData} from "../../../shared/TextNodeData";

export interface IReplacer {

    replace(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): void;

    sign() : string;

}
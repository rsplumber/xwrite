import {TextNodeData} from "../../../shared/TextNodeData";

export interface IReplacer {

    name(): string;

    replace(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): string;

}
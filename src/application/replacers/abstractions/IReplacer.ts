import {TextNodeData} from "../../../shared/TextNodeData";
import {IContainerable} from "../../containers/abstractions/IContainerable";

export interface IReplacer extends IContainerable {

    replace(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): string;

    sign(): string;

}
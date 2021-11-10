import {TextNodeData} from "../../../shared/TextNodeData";
import {IContainerable} from "../../containers/abstractions/IContainerable";

export interface IReplacer extends IContainerable {

    replaceAsync(textNodeData: TextNodeData, replaceFrom: string, replaceTo: string): Promise<string>;

    sign(): string;

}
import {IContainerable} from "../../containers/abstractions/IContainerable";
import {TextNodeData} from "../../../shared/TextNodeData";

export interface IJustifier extends IContainerable {

    justifyAsync(text: TextNodeData, width: number): Promise<string>;

    type(): string;
}
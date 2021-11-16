import {TextNodeData} from "../../../../../shared/TextNodeData";

export interface IJustifier {

    justifyAsync(text: TextNodeData, width: number): Promise<string>;

    type(): string;
}
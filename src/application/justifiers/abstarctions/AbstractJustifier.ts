import {TextNodeData} from "../../../shared/TextNodeData";

export abstract class AbstractJustifier {

    abstract justifyAsync(textNodeData: TextNodeData, width: number): Promise<string>;

    abstract sign(): string;

}
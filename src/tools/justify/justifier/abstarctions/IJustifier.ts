import {TextNodeData} from "../../../../shared/TextNodeData";
import {IJustifyCalculator} from "../../calculators/abstractions/IJustifyCalculator";

export interface IJustifier {

    type(): string;

    justifyAsync(text: TextNodeData, justifyCalculator: IJustifyCalculator): Promise<string>;

}
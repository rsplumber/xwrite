import {IContainerable} from "../../containers/abstractions/IContainerable";

export interface IJustifier extends IContainerable {

    justifyAsync(words: string[], width: number): Promise<string>;

    type(): string;
}
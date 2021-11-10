import {Context} from "../../Context";

export abstract class AbstractJustifier {

    abstract justifyAsync(words: string[], width: number): Promise<string>;

    abstract sign(): string;

    public static getBySign(sign: string): AbstractJustifier {
        return Context.getJustifierContainer().getById(sign);
    }

}
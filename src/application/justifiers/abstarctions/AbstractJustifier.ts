export abstract class AbstractJustifier {

    abstract justifyAsync(words: string[], width: number): Promise<string>;

    abstract sign(): string;

}
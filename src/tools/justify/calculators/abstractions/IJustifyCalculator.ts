export interface IJustifyCalculator {

    name(): string;

    baseCharacter(): string;

    calculateJustifyCharacterNeededAsync(line: string, fontSize, fontName, maxWidth: number, charWidth: number): Promise<number>;

    calculateCharacterSizeAsync(fontSize, fontName, justifyChar: string): Promise<number>;

}
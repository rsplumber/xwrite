import {IJustifyCalculator} from "./abstarctions/IJustifyCalculator";
import {Figma} from "../helpers/Figma";

export class SpaceJustifyCalculator implements IJustifyCalculator {

    private static instance: SpaceJustifyCalculator;


    public static getInstance(): SpaceJustifyCalculator {
        if (!SpaceJustifyCalculator.instance) {
            SpaceJustifyCalculator.instance = new SpaceJustifyCalculator();
        }
        return SpaceJustifyCalculator.instance;
    }


    name(): string {
        return "spaceJustifyCalculator";
    }

    baseCharacter(): string {
        return "_";
    }

    async calculateCharacterSizeAsync(fontSize, fontName, justifyChar: string): Promise<number> {
        const spaceWithChars = [this.baseCharacter(), justifyChar, this.baseCharacter()].join("");
        const spaceWithCharText = await Figma.createTextNodeAsync(spaceWithChars, fontSize, fontName);
        const charText = await Figma.createTextNodeAsync(this.baseCharacter(), fontSize, fontName);
        const spaceSize = spaceWithCharText.width - (charText.width * 2);
        spaceWithCharText.remove();
        charText.remove();
        return Math.ceil(spaceSize);
    }

    async calculateJustifyCharacterNeededAsync(line: string, fontSize, fontName, maxWidth: number, charWidth: number): Promise<number> {
        const tempText = await Figma.createTextNodeAsync(line, fontSize, fontName);
        const tempTextWidth = tempText.width;
        tempText.remove();
        const characterNeeded = (maxWidth - tempTextWidth) / charWidth;
        return Math.floor(characterNeeded);
    }


}
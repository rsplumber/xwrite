import {IJustifyCalculator} from "./abstractions/IJustifyCalculator";
import {Figma} from "../../../helpers/Figma";

export class JustifyCalculator implements IJustifyCalculator {

    name(): string {
        return "justifyCalculator";
    }

    baseCharacter(): string {
        return ".";
    }

    async calculateCharacterSizeAsync(fontSize, fontName, justifyChar: string): Promise<number> {
        const spaceWithChars = [this.baseCharacter(), justifyChar, this.baseCharacter()].join("");
        const spaceWithCharText = await Figma.createTextNodeAsync(spaceWithChars, fontSize, fontName);
        const charText = await Figma.createTextNodeAsync(this.baseCharacter(), fontSize, fontName);
        const spaceSize = spaceWithCharText.width - (charText.width * 2);
        spaceWithCharText.remove();
        charText.remove();
        if (spaceSize % 1 >= 0.8) {
            return Math.ceil(spaceSize);
        }
        return Math.floor(spaceSize);
    }

    async calculateJustifyCharacterNeededAsync(line: string, fontSize, fontName, maxWidth: number, charWidth: number): Promise<number> {
        const tempText = await Figma.createTextNodeAsync(line, fontSize, fontName);
        const tempTextWidth = tempText.width;
        tempText.remove();
        console.log(maxWidth + " . " + tempTextWidth + " . " + charWidth);
        const characterNeeded = (maxWidth - tempTextWidth) / charWidth;
        if (characterNeeded % 1 >= 0.5) {
            return Math.ceil(characterNeeded);
        }
        return Math.floor(characterNeeded);
    }


}
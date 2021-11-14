import {IJustifier} from "./abstarctions/IJustifier";
import {TextNodeData} from "../../shared/TextNodeData";
import {Figma} from "../helpers/Figma";
import {StringHelper} from "../helpers/StringHelper";

export class SpaceJustify implements IJustifier {

    type(): string {
        return "space_justify";
    }

    containerId(): string {
        return this.type();
    }

    async justifyAsync(textNodeData: TextNodeData, maxWidth: number): Promise<string> {
        const lines = textNodeData.text.split("\n");
        const fontSize = textNodeData.node.fontSize as number;
        const fontName = textNodeData.node.fontName as FontName;
        const spaceWidth = await SpaceJustify.calculateSpaceSize(fontSize, fontName, textNodeData.text[0]);

        for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i];
            const words = line.split(" ").filter(value => value.length >= 1);
            const lineWithoutSpace = words.join("");
            const spaceNeeded = await SpaceJustify.calculateSpaceNeeded(lineWithoutSpace, fontSize, fontName, maxWidth, spaceWidth);

            if (words.length > 1) {
                const middleWordsCount = words.slice(0, -1).length;
                const spacePerWord = Math.floor(spaceNeeded / middleWordsCount);
                const final = words.join(" ".repeat(spacePerWord));
                lines[i] = StringHelper.replace(line, line, final);
            }
        }

        return lines.join("\n");
    }

    private static async calculateSpaceNeeded(line: string, fontSize, fontName, maxWidth: number, spaceWidth: number): Promise<number> {
        const tempText = await Figma.createTextNodeAsync(line, fontSize, fontName);
        const tempTextWidth = tempText.width;
        tempText.remove();
        const spaceNeeded = (maxWidth - tempTextWidth) / spaceWidth;
        return Math.floor(spaceNeeded);
    }

    private static async calculateSpaceSize(fontSize, fontName, textFirstChar: string): Promise<number> {
        const spaceWithChars = [textFirstChar, " ", textFirstChar].join("");
        console.log("spaceWithChars: " + spaceWithChars);
        const spaceWithCharText = await Figma.createTextNodeAsync(spaceWithChars, fontSize, fontName);
        const charText = await Figma.createTextNodeAsync(textFirstChar, fontSize, fontName);
        const spaceSize = spaceWithCharText.width - (charText.width * 2)
        spaceWithCharText.remove();
        charText.remove();
        return spaceSize;
    }


}
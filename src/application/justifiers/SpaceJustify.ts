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
        const spaceWidth = await SpaceJustify.calculateSpaceSize(fontSize, fontName);

        for (let i = 0; i < lines.length - 1; i++) {

            const line = lines[i];
            const spaceNeeded = await SpaceJustify.calculateSpaceNeeded(line, fontSize, fontName, maxWidth, spaceWidth);

            if (spaceNeeded === 0) continue;

            const words = line.split(" ").filter(value => value.length >= 1);
            if (words.length > 1) {
                const middleWordsCount = words.slice(0, -1).length;
                const spacePerWord = Math.ceil(spaceNeeded / middleWordsCount) + 1;
                const final = words.join(" ".repeat(spacePerWord));

                console.log(
                    " line: " + line +
                    " words: " + words +
                    " middleWordsCount: " + middleWordsCount +
                    " space needed: " + spaceNeeded +
                    " space per word: " + spacePerWord);

                console.log("final: " + final);
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

    private static async calculateSpaceSize(fontSize, fontName): Promise<number> {
        const spaceWithChars = "_ _";
        const spaceWithCharText = await Figma.createTextNodeAsync(spaceWithChars, fontSize, fontName);
        const charText = await Figma.createTextNodeAsync("_", fontSize, fontName);
        const spaceSize = spaceWithCharText.width - (charText.width * 2);
        spaceWithCharText.remove();
        charText.remove();
        return Math.ceil(spaceSize);
    }


}
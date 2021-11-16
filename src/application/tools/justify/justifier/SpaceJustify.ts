import {IJustifier} from "./abstarctions/IJustifier";
import {TextNodeData} from "../../../../shared/TextNodeData";
import {StringHelper} from "../../../helpers/StringHelper";
import {Factories} from "../../../factories/Factories";

export class SpaceJustify implements IJustifier {

    private static instance: SpaceJustify;

    public static getInstance(): SpaceJustify {
        if (!SpaceJustify.instance) {
            SpaceJustify.instance = new SpaceJustify();
        }

        return SpaceJustify.instance;
    }

    type(): string {
        return "space_justify";
    }

    async justifyAsync(textNodeData: TextNodeData, maxWidth: number): Promise<string> {

        const justifyCalculator = Factories.JustifyCalculators("justifyCalculator");

        const lines = textNodeData.text.split("\n");
        const fontSize = textNodeData.node.fontSize as number;
        const fontName = textNodeData.node.fontName as FontName;
        const spaceWidth = await justifyCalculator.calculateCharacterSizeAsync(fontSize, fontName, " ");

        for (let i = 0; i < lines.length - 1; i++) {

            const line = lines[i];
            const spaceNeeded = await justifyCalculator.calculateJustifyCharacterNeededAsync(line, fontSize, fontName, maxWidth, spaceWidth);
            if (spaceNeeded === 0) continue;

            const words = line.split(" ").filter(value => value.length >= 1);
            if (words.length > 1) {
                const middleWordsCount = words.slice(0, -1).length;
                const spacePerWord = Math.floor(spaceNeeded / middleWordsCount);
                let extraSpaces = spaceNeeded % middleWordsCount;

                const finalText = [];
                for (let j = 0; j < words.slice(0, -1).length; j++) {
                    let word = words[j] + " ".repeat(spacePerWord);
                    if (extraSpaces != 0) {
                        word = word + " ".repeat(extraSpaces);
                        extraSpaces = 0;
                    }
                    finalText.push(word);
                }
                finalText.push(words[words.length - 1]);
                const final = finalText.join(" ");

                lines[i] = StringHelper.replace(line, line, final);
            }
        }

        return lines.join("\n");
    }

}
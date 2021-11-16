import {IJustifier} from "./abstarctions/IJustifier";
import {TextNodeData} from "../../shared/TextNodeData";
import {Context} from "../Context";
import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {StringHelper} from "../helpers/StringHelper";

export class PersianJustify implements IJustifier {

    private static readonly UNDER_LINE_ABLE_CHARS = [
        "س", "ل", "م", "ب", "ع", "ی",
    ]

    type(): string {
        return "persian_justify";
    }

    containerId(): string {
        return this.type();
    }

    async justifyAsync(textNodeData: TextNodeData, maxWidth: number): Promise<string> {

        const justifyCalculator = Context.justifyCalculatorFactory().getJustifyCalculator("justifyCalculator");

        const lines = textNodeData.text.split("\n");
        const fontSize = textNodeData.node.fontSize as number;
        const fontName = textNodeData.node.fontName as FontName;
        const spaceWidth = await justifyCalculator.calculateCharacterSizeAsync(fontSize, fontName, "ـ");

        for (let i = 0; i < lines.length - 1; i++) {

            const line = lines[i];
            const directionFixedLine = TextDirectionFixer.fix(line);
            const underlineNeeded = await justifyCalculator.calculateJustifyCharacterNeededAsync(directionFixedLine, fontSize, fontName, maxWidth, spaceWidth);
            if (underlineNeeded === 0) continue;

            const words = line.split(" ").filter(value => value.length >= 1);
            if (words.length > 1) {
                const wordsCount = words.length;
                const underlinePerWord = Math.floor(underlineNeeded / wordsCount);
                let extraUnderline = underlineNeeded % wordsCount;

                const finalText = [];
                words.forEach(word => {
                    let chars = word.split("");
                    for (let j = 0; j < chars.slice(0, -1).length; j++) {
                        if (PersianJustify.UNDER_LINE_ABLE_CHARS.indexOf(chars[j]) !== -1) {
                            chars[j] = chars[j] + "ـ".repeat(underlinePerWord);
                            if (extraUnderline != 0) {
                                chars[j] = chars[j] + "ـ".repeat(extraUnderline);
                                extraUnderline = 0;
                            }
                            break;
                        }
                    }

                    finalText.push(chars.join(""));
                });
                const final = finalText.join(" ");

                lines[i] = StringHelper.replace(line, line, final);
            }
        }

        return lines.join("\n");
    }

}
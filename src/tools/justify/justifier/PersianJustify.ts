import {IJustifier} from "./abstarctions/IJustifier";
import {TextNodeData} from "../../../shared/TextNodeData";
import {TextDirectionFixer} from "../../../helpers/TextDirectionFixer";
import {StringHelper} from "../../../helpers/StringHelper";
import {IJustifyCalculator} from "../calculators/abstractions/IJustifyCalculator";

export class PersianJustify implements IJustifier {

    private static readonly UNDER_LINE_ABLE_CHARS = [
        "ی", "ه", "ن", "م", "ل", "گ", "ک", "ق", "ف", "غ", "ع", "ظ", "ط", "ض", "ص", "ش", "س", "خ", "ح", "چ", "ج", "ث", "ت", "پ", "ب"
    ]

    type(): string {
        return "persianJustify";
    }

    async justifyAsync(textNodeData: TextNodeData, justifyCalculator: IJustifyCalculator): Promise<string> {

        const maxWidth = textNodeData.node.width;
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
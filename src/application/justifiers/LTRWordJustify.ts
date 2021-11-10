import {TextNodeData} from "../../shared/TextNodeData";
import {AbstractJustifier} from "./abstarctions/AbstractJustifier";

export class LTRWordJustify extends AbstractJustifier {

    async justifyAsync(textNodeData: TextNodeData, width: number): Promise<string> {
        const seperatedByEnters = textNodeData.text.split("\n");
        let finalTextList = [];
        console.log("width: " + width);
        for (let i = 0; i < seperatedByEnters.length; i++) {
            const line = seperatedByEnters[i];
            if (i === (seperatedByEnters.length - 1)) continue;
            console.log("line: " + line);
            const diff = width - line.length;
            const words = line.split(" ");
            const spaceSections = words.length - 1;
            const spaces = diff / spaceSections;
            console.log("spaces: " + spaces);
            let extraSpaces = diff % spaceSections;
            console.log("eSpaces: " + extraSpaces);
            let finalTextOfLine = "";
            words.forEach(value => {
                console.log("word of line: " + value);
                let spacesChars = "";
                for (let i = 0; i < spaces + extraSpaces; i++) {
                    spacesChars += " ";
                    extraSpaces = 0;
                }
                finalTextOfLine += value + spacesChars;
            })
            finalTextList.push(finalTextOfLine);
        }

        console.log(finalTextList.join("\n"));
        return finalTextList.join("\n");
    }

    sign(): string {
        return "ltr_word_justify";
    }


}
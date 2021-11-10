import {AbstractJustifier} from "./abstarctions/AbstractJustifier";

export class SpaceJustify extends AbstractJustifier {

    async justifyAsync(words: string[], maxWidth: number): Promise<string> {
        let i = 0;
        const n = words.length;
        const result = [];
        while (i < n) {
            let j = i + 1;
            let lineLength = words[i].length;
            while (j < n && (lineLength + words[j].length + (j - i - 1)) < maxWidth) {
                lineLength += words[j].length;
                j++;
            }
            let diff = maxWidth - lineLength;
            let numberOfWords = j - 1;
            if (numberOfWords == 1 || j >= n) {
                result.push(SpaceJustify.leftJustify(words, diff, i, j));
            } else {
                result.push(SpaceJustify.middleJustify(words, diff, i, j));
            }

            i = j;
        }

        return result.join().split(",").join("\n");
    }

    sign(): string {
        return "space_justify";
    }

    private static leftJustify(words: string[], diff: number, i: number, j: number): string {

        let spacesOnRight = diff - (j - i - 1);
        let result = words[i];
        for (let k = i + 1; k < j; k++) {
            result += " " + words[k];
        }

        result += " ".repeat(spacesOnRight);

        return result;
    }

    private static middleJustify(words: string[], diff: number, i: number, j: number): string {
        let spaceNeeded = j - i - 1;
        let spaces = diff / spaceNeeded;
        let extraSpaces = diff % spaceNeeded;
        let result = words[i];
        for (let k = i + 1; k < j; k++) {
            let spacesToApply = spaces + (extraSpaces-- > 0 ? 1 : 0);
            result += " ".repeat(spacesToApply) + words[k];
        }
        return result;
    }


}
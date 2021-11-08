import {RandomHelper} from "./RandomHelper";

export class DirectionDetector {

    private static readonly RTL_CHARACTERS: string[] = [
        "ی", "ه", "و", "ن", "م", "ل", "گ", "ک", "ق", "ف", "غ", "ع", "ظ", "ط", "ض", "ص", "ش", "س", "ژ", "ز", "ر", "ذ", "د", "خ", "ح", "چ", "ج", "ث", "ت", "پ", "ب", "ا", "آ", "ء",
        "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰",
    ];

    private static readonly CHECK_PERCENT = 80;
    private static readonly PASS_PERCENT = 40;

    public static detectDirection(text: string): Direction {
        if (text.length <= 1) {
            return Direction.Unknown;
        }

        const charsToCheck = DirectionDetector.findRandomCharsToCheck(text);

        const rtlDetected = DirectionDetector.checkIfTextPassRtlDetection(charsToCheck);

        return rtlDetected ? Direction.RTL : Direction.LTR;
    }


    private static findRandomCharsToCheck(text: string): string[] {
        const charsToCheckCount = Math.floor((text.length * DirectionDetector.CHECK_PERCENT) / 100);
        const charsToCheck = [];
        for (let i = 0; i < charsToCheckCount; i++) {
            charsToCheck.push(text[RandomHelper.getRandomInt(0, text.length)])
        }

        return charsToCheck;
    }

    private static checkIfTextPassRtlDetection(charsToCheck: string[]): boolean {
        let currentPassPercent = 0;
        let countedPass = 0;
        charsToCheck.forEach(value => {
            if (this.RTL_CHARACTERS.indexOf(value) !== -1) {
                countedPass++;
                currentPassPercent = (countedPass * 100) / charsToCheck.length;
            }
            if (currentPassPercent >= DirectionDetector.PASS_PERCENT) {
                return true;
            }
        });
        return false;
    }

}


export enum Direction {
    RTL = "RTL", LTR = "LTR", Unknown = LTR
}
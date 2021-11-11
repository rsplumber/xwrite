import {RandomHelper} from "./RandomHelper";
import {Constants} from "../../shared/Constants";

export class DirectionDetector {


    private static readonly CHECK_PERCENT = 90;
    private static readonly PASS_PERCENT = 70;

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
        for (let i = 0; i < charsToCheck.length; i++) {
            if (Constants.PERSIAN_CHARACTERS.indexOf(charsToCheck[i]) !== -1) {
                countedPass++;
                currentPassPercent = (countedPass * 100) / charsToCheck.length;
            }
            if (currentPassPercent >= DirectionDetector.PASS_PERCENT) {
                return true;
            }
        }
        return false;
    }

}


export enum Direction {
    RTL = "RTL", LTR = "LTR", Unknown = LTR
}
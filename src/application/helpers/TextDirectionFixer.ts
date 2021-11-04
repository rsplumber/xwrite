import {Direction, DirectionDetector} from "./DirectionDetector";
import {StringHelper} from "./StringHelper";

export class TextDirectionFixer {

    public static fix(text: string): string {
        return DirectionDetector.detectDirection(text) == Direction.LTR ? text : StringHelper.toRtl(text);
    }
}
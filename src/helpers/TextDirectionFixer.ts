import {DirectionDetector} from "../tools/directions/DirectionDetector";
import {StringHelper} from "./StringHelper";
import {Direction} from "../tools/directions/Direction";

export class TextDirectionFixer {

    public static fix(text: string): string {
        return DirectionDetector.detectDirection(text) == Direction.LTR ? text : StringHelper.toRtl(text);
    }
}
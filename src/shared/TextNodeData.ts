import {TextDirectionFixer} from "../application/helpers/TextDirectionFixer";

export class TextNodeData {
    public id: string;
    public node: TextNode;
    public text: string;
    public final_text: string = "";

    constructor(node: TextNode) {
        if (node == null) return;
        this.id = node.id;
        this.node = node;
        this.text = TextDirectionFixer.fix(node.characters);
    }

    public setCustomText(text: string, directionFix: boolean = true): void {
        let finalText = text;
        if (directionFix) {
            finalText = TextDirectionFixer.fix(text)
        }
        this.text = finalText;
    }
}
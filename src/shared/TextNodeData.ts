import {TextDirectionFixer} from "../helpers/TextDirectionFixer";
import {IContainerable} from "../core/abstractions/containers/IContainerable";

export class TextNodeData implements IContainerable {

    public id: string;
    public node: TextNode;
    public text: string;
    public finalText: string = "";
    public layerName: string;
    public position: number;

    constructor(node: TextNode) {
        if (node == null) return;
        this.id = node.id;
        this.node = node;
        this.text = TextDirectionFixer.fix(node.characters);
        this.position = node.y;
        this.layerName = node.name;
    }

    containerId(): string {
        return this.id;
    }

    public setCustomText(text: string, directionFix: boolean = true): void {
        let finalText = text;
        if (directionFix) {
            finalText = TextDirectionFixer.fix(text)
        }
        this.text = finalText;
    }


}
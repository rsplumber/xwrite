import {TextDirectionFixer} from "../application/helpers/TextDirectionFixer";

export class TextNodeData{
    public id: string;
    public node: TextNode;
    public text : string;
    public final_text :string = "";

    constructor(node: TextNode , text : string){
        this.id = node.id;
        this.node= node;
        this.text = TextDirectionFixer.fix(text);
    }
}
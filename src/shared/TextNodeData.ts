export class TextNodeData{
    private _id: string;
    private _node: TextNode;
    private _text : string;
    private _final_text :string = "";

    constructor(node: TextNode , text : string){
        this._id = node.id;
        this._node= node;
        this._text = text;
    }


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get node(): TextNode {
        return this._node;
    }

    set node(value: TextNode) {
        this._node = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get final_text(): string {
        return this._final_text;
    }

    set final_text(value: string) {
        this._final_text = value;
    }
}
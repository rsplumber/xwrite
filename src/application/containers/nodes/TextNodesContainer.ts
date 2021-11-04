import {TextNodeData} from "../../../shared/TextNodeData";
import {BaseContainer} from "../BaseContainer";

export class TextNodesContainer extends BaseContainer<TextNodeData> {

    private static instance: TextNodesContainer;

    protected constructor() {
        super();
    }

    public static getInstance(): TextNodesContainer {
        if (!TextNodesContainer.instance) {
            TextNodesContainer.instance = new TextNodesContainer();
        }

        return TextNodesContainer.instance;
    }

    initItems(): void {
        super.items = new Array<TextNodeData>();
    }

    getById(id: string): TextNodeData {
        return super.items.find(value => value.id === id);
    }
}

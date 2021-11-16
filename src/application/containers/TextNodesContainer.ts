import {TextNodeData} from "../../shared/TextNodeData";
import {AbstractContainer} from "../abstractions/containers/AbstractContainer";

export class TextNodesContainer extends AbstractContainer<TextNodeData> {

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
}

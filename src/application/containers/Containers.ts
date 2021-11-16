import {AbstractContainer} from "../abstractions/containers/AbstractContainer";
import {TextNodeData} from "../../shared/TextNodeData";
import {TextNodesContainer} from "./TextNodesContainer";

export class Containers {

    public static textNodeDataContainer(): AbstractContainer<TextNodeData> {
        return TextNodesContainer.getInstance();
    }

}
import {AbstractContainer} from "./abstractions/AbstractContainer";
import {IJustifier} from "../justifiers/abstarctions/IJustifier";

export class JustifiersContainer extends AbstractContainer<IJustifier> {

    private static instance: JustifiersContainer;

    protected constructor() {
        super();

    }

    public static getInstance(): JustifiersContainer {
        if (!JustifiersContainer.instance) {
            JustifiersContainer.instance = new JustifiersContainer();
        }

        return JustifiersContainer.instance;
    }

}

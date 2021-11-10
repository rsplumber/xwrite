import {AbstractContainer} from "./abstractions/AbstractContainer";
import {AbstractJustifier} from "../justifiers/abstarctions/AbstractJustifier";

export class JustifiersContainer extends AbstractContainer<AbstractJustifier> {

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


    getById(id: string): AbstractJustifier {
        return this.getAll().find(value => value.sign() === id);
    }
}

import {AbstractContainer} from "./abstractions/AbstractContainer";
import {IReplacer} from "../replacers/abstractions/IReplacer";

export class ReplacersContainer extends AbstractContainer<IReplacer> {

    private static instance: ReplacersContainer;

    protected constructor() {
        super();
    }

    public static getInstance(): ReplacersContainer {
        if (!ReplacersContainer.instance) {
            ReplacersContainer.instance = new ReplacersContainer();
        }

        return ReplacersContainer.instance;
    }
}

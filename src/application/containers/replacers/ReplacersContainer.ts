import {AbstractContainer} from "../abstractions/AbstractContainer";
import {AbstractReplacer} from "../../commands/replacer/AbstractReplacer";

export class ReplacersContainer extends AbstractContainer<AbstractReplacer> {

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


    getById(id: string): AbstractReplacer {
        return this.getAll().find(value => value.sign() === id);
    }
}

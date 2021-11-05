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

    initItems(): void {
        super.items = new Array<AbstractReplacer>();
    }

    getById(id: string): AbstractReplacer {
        return super.items.find(value => value.sign() === id);
    }
}

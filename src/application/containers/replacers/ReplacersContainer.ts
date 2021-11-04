import {AbstractContainer} from "../abstractions/AbstractContainer";
import {IReplacer} from "../../commands/replacer/IReplacer";

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

    initItems(): void {
        super.items = new Array<IReplacer>();
    }

    getById(id: string): IReplacer {
        return super.items.find(value => value.sign() === id);
    }
}

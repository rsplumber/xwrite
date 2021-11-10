import {IContainer} from "./IContainer";
import {IContainerable} from "./IContainerable";

export abstract class AbstractContainer<Type extends IContainerable> implements IContainer<Type> {

    protected constructor() {
    }

    protected items: Array<Type> = new Array<Type>();

    getById(id: string): Type {
        return this.getAll().find(value => value.containerId() === id);
    }

    add(item: Type): void {
        this.items.push(item);
    }

    addRange(items: Type[]): void {
        items.forEach(value => this.items.push(value));
    }


    getAll(): Array<Type> {
        return this.items;
    }

    refresh(): void {
        while (this.items.length > 0) {
            this.items.pop();
        }
    }

    remove(item: Type): void {

    }

}
import {IContainer} from "./IContainer";

export abstract class AbstractContainer<Type> implements IContainer<Type> {

    protected constructor() {
    }

    protected items: Array<Type>;

    abstract initItems(): void;

    abstract getById(id: string): Type;

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
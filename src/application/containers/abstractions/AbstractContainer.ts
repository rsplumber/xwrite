import {IContainer} from "./IContainer";
import {IContainerable} from "./IContainerable";

export abstract class AbstractContainer<Type extends IContainerable> implements IContainer<Type> {

    protected constructor() {
    }

    protected items: Map<string, Type> = new Map<string, Type>();

    getById(id: string): Type {
        return this.items.get(id);
    }

    add(item: Type): void {
        this.items.set(item.containerId(), item);
    }

    addRange(items: Type[]): void {
        items.forEach(value => this.add(value));
    }


    getAll(): Array<Type> {
        return Array.from(this.items.values());
    }

    refresh(): void {
        this.items.clear();
    }

    remove(item: Type): void {
        this.removeById(item.containerId());
    }

    removeById(id: string): void {
        this.items.delete(id);
    }

    count(): number {
        return this.items.size;
    }

}
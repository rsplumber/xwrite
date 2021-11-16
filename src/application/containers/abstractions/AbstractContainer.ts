import {IContainer} from "./IContainer";
import {IContainerable} from "./IContainerable";
import {Context} from "../../Context";

export abstract class AbstractContainer<Type extends IContainerable> implements IContainer<Type> {

    protected constructor() {
    }

    protected items: Map<string, Type> = new Map<string, Type>();

    getById(id: string): Type {
        this.logContainer("getById", id);
        return this.items.get(id);
    }

    add(item: Type): void {
        this.logContainer("add", item);
        this.items.set(item.containerId(), item);
    }

    addRange(items: Type[]): void {
        this.logContainer("addRange", items);
        items.forEach(value => this.add(value));
    }


    getAll(): Array<Type> {
        this.logContainer("getAll", null);
        return Array.from(this.items.values());
    }

    first(): Type {
        if (this.items.size >= 1) {
            return this.items.values().next().value;
        }
        return null;
    }


    refresh(): void {
        this.logContainer("refresh", null);
        this.items.clear();
    }

    remove(item: Type): void {
        this.logContainer("remove", item);
        this.removeById(item.containerId());
    }

    removeById(id: string): void {
        this.logContainer("removeById", id);
        this.items.delete(id);
    }

    count(): number {
        this.logContainer("count", null);
        return this.items.size;
    }

    private logContainer(methodName: string, data) {
        if (!Context.isDebugMode()) return;
        console.log("**********CONTAINER*************************")
        console.log("container size: " + this.items.size);
        console.log("container items:");
        console.log(JSON.stringify(this.items));
        console.log("-----------METHOD---------------------------")
        console.log("container method name: " + methodName);
        console.log("container method data: " + JSON.stringify(data));
        console.log("--------------------------------------------")
    }

}
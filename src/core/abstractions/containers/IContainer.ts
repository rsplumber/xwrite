import {IContainerable} from "./IContainerable";

export interface IContainer<Type extends IContainerable> {

    refresh(): void;

    add(item: Type): void;

    addRange(items: Type[]): void;

    remove(item: Type): void;

    removeById(id: string): void;

    getAll(): Array<Type>;

    first(): Type;

    getById(id: string): Type;

    count(): number;

    updateValues(items: Type[]);

}
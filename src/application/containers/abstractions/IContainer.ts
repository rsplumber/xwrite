import {IContainerable} from "./IContainerable";

export interface IContainer<Type extends IContainerable> {

    refresh(): void;

    add(item: Type): void;

    addRange(items: Type[]): void;

    remove(item: Type): void;

    getAll(): Array<Type>;

    getById(id: string): Type;

}
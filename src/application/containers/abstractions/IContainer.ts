export interface IContainer<Type> {

    refresh(): void;

    add(item: Type): void;

    addRange(items: Type[]): void;

    remove(item: Type): void;

    getAll(): Array<Type>;

}
export interface IFactory<Type> {

    getOrCreate(name: string): Type;

}
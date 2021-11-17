export class Resolver {

    private static instance: Resolver;
    private dependencies: Map<string, object>;

    private dependenciesInfo: Map<string, {
        register: object,
        registerType?: DependencyType
    }>

    private constructor() {
        this.dependencies = new Map<string, object>();
        this.dependenciesInfo = new Map<string, { register: object; registerType?: DependencyType }>();
    }

    public static getInstance(): Resolver {
        if (!Resolver.instance) {
            Resolver.instance = new Resolver();
        }
        return Resolver.instance;
    }

    public static resolve<Type extends object>(key: string): Type {
        return Resolver.getInstance().resolveDependency<Type>(key) as Type;
    }

    private resolveDependency<Type extends object>(key: string): Type {
        let value = this.get<Type>(key);
        if (!value) {
            value = this.createAndAddDependency<Type>(key);
        }
        return value;
    }

    public addDependency(key: string, value: object) {
        this.dependencies.set(key, value);
    }

    private get<Type extends object>(key: string): Type {
        return this.dependencies.get(key) as Type;
    }

    public register(key: string, register, registerType: DependencyType = DependencyType.Singleton) {
        const value = {
            register: register,
            registerType: registerType
        };

        this.dependenciesInfo.set(key, value);
    }

    private createAndAddDependency<Type extends object>(key: string): Type {
        const dependencyInfo = this.dependenciesInfo.get(key);
        if (!dependencyInfo) return null;
        const createdObject = Resolver.createObject(dependencyInfo.register);
        this.addDependency(key, createdObject);
        return createdObject as Type;
    }

    private static createObject(objectToCreate) {
        return Object.create(objectToCreate.prototype);
    }

}

export enum DependencyType {
    Singleton, Transient
}
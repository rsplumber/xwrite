import {DependencyType} from "./DependencyType";

export class DependencyResolver {

    private static instance: DependencyResolver;
    private dependencies: Map<string, object>;

    private dependenciesInfo: Map<string, {
        register: object,
        registerType?: DependencyType
    }>

    private constructor() {
        this.dependencies = new Map<string, object>();
        this.dependenciesInfo = new Map<string, { register: object; registerType?: DependencyType }>();
    }

    public static getInstance(): DependencyResolver {
        if (!DependencyResolver.instance) {
            DependencyResolver.instance = new DependencyResolver();
        }
        return DependencyResolver.instance;
    }

    public static resolve<Type extends object>(key: string): Type {
        return DependencyResolver.getInstance().resolveDependency<Type>(key) as Type;
    }

    private static createObject(objectToCreate) {
        return Object.create(objectToCreate.prototype);
    }

    public addDependency(key: string, value: object) {
        this.dependencies.set(key, value);
    }

    public register(key: string, register, registerType: DependencyType = DependencyType.Singleton) {
        const value = {
            register: register,
            registerType: registerType
        };

        this.dependenciesInfo.set(key, value);
    }

    private resolveDependency<Type extends object>(key: string): Type {
        let value = this.getFromContainer<Type>(key);
        if (!value) {
            const dependencyInfo = this.getDependencyInfo(key);
            if (dependencyInfo == null) return;
            switch (dependencyInfo.registerType) {
                case DependencyType.Singleton:
                    value = this.createAndAddDependency<Type>(key);
                    break;
                case DependencyType.Transient:
                    value = DependencyResolver.createObject(dependencyInfo.register)
                    break
                default:
                    value = this.createAndAddDependency<Type>(key);
                    break;
            }
        }
        return value;
    }

    private getFromContainer<Type extends object>(key: string): Type {
        return this.dependencies.get(key) as Type;
    }

    private getDependencyInfo(key: string) {
        return this.dependenciesInfo.get(key);
    }

    private createAndAddDependency<Type extends object>(key: string): Type {
        const dependencyInfo = this.dependenciesInfo.get(key);
        if (!dependencyInfo) return null;
        const createdObject = DependencyResolver.createObject(dependencyInfo.register);
        this.addDependency(key, createdObject);
        return createdObject as Type;
    }


}


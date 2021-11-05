export class ReflectionHelper {
    public static createInstance(className: string, constructorParams: []) {
        const newInstance = Object.create(window[className].prototype);
        return newInstance.constructor.apply(newInstance, constructorParams);
    }

    public static getSubclasses(baseClass) {
        const globalObject = Function('return this')();
        const allVars = Object.keys(globalObject);
        return allVars.filter(function (key) {
            try {
                const obj = globalObject[key];
                return obj.prototype instanceof baseClass;
            } catch (e) {
                return null;
            }
        });
    }

    public static createSubClassesFor(baseClass) {
        const classes = [];
        ReflectionHelper.getSubclasses(baseClass)
            .forEach(value => {
                classes.push(ReflectionHelper.createInstance(value, null));
            });
        return classes;
    }
}
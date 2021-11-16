import {IReplacer} from "../tools/replacers/abstractions/IReplacer";
import {ReplacerFactory} from "../tools/replacers/ReplacerFactory";
import {JustifierFactory} from "../tools/justify/justifier/JustifierFactory";
import {IJustifier} from "../tools/justify/justifier/abstarctions/IJustifier";
import {JustifyCalculatorFactory} from "../tools/justify/calculators/JustifyCalculatorFactory";
import {IJustifyCalculator} from "../tools/justify/calculators/abstractions/IJustifyCalculator";

export class Factories {

    public static Replacers(name: string): IReplacer {
        return ReplacerFactory.getInstance().getOrCreate(name);
    }

    public static Justifiers(name: string): IJustifier {
        return JustifierFactory.getInstance().getOrCreate(name);
    }

    public static JustifyCalculators(name: string): IJustifyCalculator {
        return JustifyCalculatorFactory.getInstance().getOrCreate(name);
    }
}
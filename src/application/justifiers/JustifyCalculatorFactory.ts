import {IJustifyCalculatorFactory} from "./abstarctions/IJustifyCalculatorFactory";
import {IJustifyCalculator} from "./abstarctions/IJustifyCalculator";
import {JustifyCalculator} from "./JustifyCalculator";

export class JustifyCalculatorFactory implements IJustifyCalculatorFactory {

    private static instance: JustifyCalculatorFactory;

    public static getInstance(): JustifyCalculatorFactory {
        if (!JustifyCalculatorFactory.instance) {
            JustifyCalculatorFactory.instance = new JustifyCalculatorFactory();
        }

        return JustifyCalculatorFactory.instance;
    }

    getJustifyCalculator(name: string): IJustifyCalculator {
        switch (name) {
            case "spaceJustifyCalculator":
                return JustifyCalculator.getInstance();
        }
        return JustifyCalculator.getInstance();
    }


}
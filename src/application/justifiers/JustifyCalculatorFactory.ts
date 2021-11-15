import {IJustifyCalculatorFactory} from "./abstarctions/IJustifyCalculatorFactory";
import {IJustifyCalculator} from "./abstarctions/IJustifyCalculator";
import {SpaceJustifyCalculator} from "./SpaceJustifyCalculator";

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
                return SpaceJustifyCalculator.getInstance();
        }
        return SpaceJustifyCalculator.getInstance();
    }


}
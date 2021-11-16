import {IJustifyCalculator} from "./abstractions/IJustifyCalculator";
import {JustifyCalculator} from "./JustifyCalculator";
import {IFactory} from "../../../abstractions/factories/IFactory";

export class JustifyCalculatorFactory implements IFactory<IJustifyCalculator> {

    private static instance: JustifyCalculatorFactory;

    public static getInstance(): JustifyCalculatorFactory {
        if (!JustifyCalculatorFactory.instance) {
            JustifyCalculatorFactory.instance = new JustifyCalculatorFactory();
        }

        return JustifyCalculatorFactory.instance;
    }


    getOrCreate(name: string): IJustifyCalculator {
        switch (name) {
            case "spaceJustifyCalculator":
                return JustifyCalculator.getInstance();
        }
        return JustifyCalculator.getInstance();
    }


}
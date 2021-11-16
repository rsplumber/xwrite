import {IJustifyCalculator} from "./IJustifyCalculator";

export interface IJustifyCalculatorFactory {
    getJustifyCalculator(name: string): IJustifyCalculator;
}
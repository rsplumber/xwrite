import {IFactory} from "../../../abstractions/factories/IFactory";
import {IJustifier} from "./abstarctions/IJustifier";
import {PersianJustify} from "./PersianJustify";
import {SpaceJustify} from "./SpaceJustify";

export class JustifierFactory implements IFactory<IJustifier> {

    private static instance: JustifierFactory;

    public static getInstance(): JustifierFactory {
        if (!JustifierFactory.instance) {
            JustifierFactory.instance = new JustifierFactory();
        }

        return JustifierFactory.instance;
    }


    getOrCreate(name: string): IJustifier {
        switch (name) {
            case "persian_justify":
                return PersianJustify.getInstance();
            case "space_justify":
                return SpaceJustify.getInstance();
        }
        return SpaceJustify.getInstance();
    }


}
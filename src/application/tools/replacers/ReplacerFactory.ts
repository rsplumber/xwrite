import {IReplacer} from "./abstractions/IReplacer";
import {ReplaceAllReplacer} from "./ReplaceAllReplacer";
import {StandardReplaceReplacer} from "./StandardReplaceReplacer";
import {IFactory} from "../../abstractions/factories/IFactory";

export class ReplacerFactory implements IFactory<IReplacer> {

    private static instance: ReplacerFactory;

    public static getInstance(): ReplacerFactory {
        if (!ReplacerFactory.instance) {
            ReplacerFactory.instance = new ReplacerFactory();
        }

        return ReplacerFactory.instance;
    }


    getOrCreate(name: string): IReplacer {
        switch (name) {
            case "*.*":
                return ReplaceAllReplacer.getInstance();
            case "$__standard":
                return StandardReplaceReplacer.getInstance();
        }
        return StandardReplaceReplacer.getInstance();
    }


}
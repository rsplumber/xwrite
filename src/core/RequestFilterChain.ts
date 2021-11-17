import {IFilter} from "./abstractions/filters/IFilter";
import {AbstractFilter} from "./abstractions/filters/AbstractFilter";

export class RequestFilterChain {

    private static instance: RequestFilterChain;
    private requestChainFilter: IFilter;

    public static getInstance(): RequestFilterChain {
        if (!RequestFilterChain.instance) {
            RequestFilterChain.instance = new RequestFilterChain();
        }

        return RequestFilterChain.instance;
    }


    public static initChain(filters: AbstractFilter[]) {
        const organizedFilters = filters
            .sort((a, b) => a.getOrder() - b.getOrder())
            .filter(value => !value.disabled());

        RequestFilterChain.getInstance().requestChainFilter = organizedFilters[0];
        for (let i = 0; i < organizedFilters.length; i++) {
            if (i < organizedFilters.length - 1) {
                organizedFilters[i].setNext(organizedFilters[i + 1]);
            }
        }
    }

    public static chain(): IFilter {
        return RequestFilterChain.getInstance().requestChainFilter;
    }

}
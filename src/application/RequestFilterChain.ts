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
        RequestFilterChain.getInstance().requestChainFilter = filters[0];
        for (let i = 0; i < filters.length; i++) {
            if (i < filters.length - 1) {
                filters[i].setNext(filters[i + 1]);
            }
        }
    }

    public static chain(): IFilter {
        return RequestFilterChain.getInstance().requestChainFilter;
    }

}
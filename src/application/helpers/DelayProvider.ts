export class DelayProvider {

    private static instance: DelayProvider;
    private static alreadyDelayLaunched: boolean;

    public static getInstance(): DelayProvider {
        if (!DelayProvider.instance) {
            DelayProvider.instance = new DelayProvider();
        }

        return DelayProvider.instance;
    }

    public delay(delayTime: number) {
        if (DelayProvider.alreadyDelayLaunched) return;
        return new Promise(resolve => {
            setTimeout(resolve, delayTime);
        });
    }

}
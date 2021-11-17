export class DelayProvider {

    private static alreadyDelayLaunched: boolean;

    public delay(delayTime: number) {
        if (DelayProvider.alreadyDelayLaunched) return;
        return new Promise(resolve => {
            setTimeout(resolve, delayTime);
        });
    }

}
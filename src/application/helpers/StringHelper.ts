export class StringHelper {
    public static toRtl(value: string): string {
        return StringHelper.upsideDown(StringHelper.reverseString(value));
    }

    public static reverseString(value: string): string {
        return value.split('').reverse().join("");
    }

    public static upsideDown(value: string): string {
        return value.split('\n').reverse().join('\n');
    }
}
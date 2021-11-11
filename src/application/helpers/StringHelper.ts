export class StringHelper {


    public static reverseString(value: string): string {
        return value.split('').reverse().join("");
    }

    public static upsideDown(value: string): string {
        return value.split('\n').reverse().join('\n');
    }

    public static replace(value: string, replaceFrom: string, replaceTo: string): string {
        return value.split(replaceFrom).join(replaceTo)
    }


    public static toRtl(value: string): string {
        const reversed = StringHelper.reverseString(value);
        // const sanitized = StringHelper.sanitize(reversed);
        return StringHelper.upsideDown(reversed);
    }


    private static sanitize(value: string): string {
        const numbersCorrected = StringHelper.correctNumbers(value);
        const ltrCorrected = StringHelper.correctLtrText(numbersCorrected);
        return StringHelper.correctSigns(ltrCorrected);
    }

    private static readonly NUMBERS: string[] = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
        "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰",
    ];

    private static correctNumbers(value: string): string {
        const letters = value.split('');
        for (let i = 0; i < letters.length; i++) {

            if (StringHelper.isNumber(letters[i])) {
                const foundedNumbers = [];
                const numberIndex = letters.indexOf(letters[i]);
                for (let j = numberIndex; j < letters.length; j++) {
                    if (!StringHelper.isNumber(letters[j])) break;
                    foundedNumbers.push(letters[j])
                    i += 1;
                }
                console.log(foundedNumbers);
            }

        }
        return value;
    }

    private static isNumber(letter: string): boolean {
        return StringHelper.NUMBERS.indexOf(letter) !== -1;
    }

    private static correctLtrText(value: string): string {
        return value;
    }

    private static correctSigns(value: string): string {
        return value;
    }


}
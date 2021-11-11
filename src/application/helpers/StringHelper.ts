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
        const upsideDown = StringHelper.upsideDown(reversed);
        return StringHelper.sanitize(upsideDown);
    }


    private static sanitize(value: string): string {
        const numbersCorrected = StringHelper.correctNumbers(value);
        const ltrCorrected = StringHelper.correctLtrText(numbersCorrected);
        return ltrCorrected;
    }

    private static readonly NUMBERS: string[] = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
        "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰",
    ];

    private static correctNumbers(value: string): string {
        return StringHelper.sanitizer(value , StringHelper.NUMBERS);
    }


    private static readonly ENGLISH_ALPHABET: string[] = [
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L",
        "Z", "X", "C", "V", "B", "N", "M",
        "q","w","e","r","t","y","u","i","o","p",
        "a","s","d","f","g","h","j","k","l",
        "z","x","c","v","b","n","m"
    ];

    private static correctLtrText(value: string): string {
        return StringHelper.sanitizer(value , StringHelper.ENGLISH_ALPHABET);
    }

    private static correctSigns(value: string): string {
        return value;
    }

    private static sanitizer(value:string , mustToFind:string[]){
        const letters = value.split('');
        let finalValue = value;
        for (let i = 0; i < letters.length; i++) {

            if (mustToFind.indexOf(letters[i]) !== -1) {
                const founded = [];
                const foundedIndex = letters.indexOf(letters[i]);
                for (let j = foundedIndex; j < letters.length; j++) {
                    if (mustToFind.indexOf(letters[i]) === -1) break;
                    founded.push(letters[j])
                    i++;
                }

                const from = founded.join("").toString();
                const to = founded.reverse().join("").toString();
                finalValue = StringHelper.replace(finalValue, from, to);
            }

        }
        return finalValue;
    }


}
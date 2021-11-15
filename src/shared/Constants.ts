export class Constants {

    public static readonly FREE_SIGNS: string[] = [" ", ".", ",", "@", "!", "#", "$", "%", "^", "&",
        "*", "(", ")", "_", "+", "=", "~", "`", "/", "<", ">" ,"?"
    ];

    public static readonly ENGLISH_NUMBERS: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    public static readonly PERSIAN_NUMBERS: string[] = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

    public static readonly NUMBERS: string[] = [...Constants.PERSIAN_NUMBERS, ...Constants.ENGLISH_NUMBERS];

    public static readonly PERSIAN_SIGNS: string[] = ["‌", "÷", "٬", "﷼", "٪", "×", "،", "*", "ْ", "ٌ", "ً", "ُ",
        "ِ", "َ", "ّ", "ؤ", "ئ", "ي", "إ", "أ", "آ", "ة", "؟"
    ];

    public static readonly PERSIAN_ALPHABET: string[] = [
        "ی", "ه", "و", "ن", "م", "ل", "گ", "ک", "ق", "ف", "غ", "ع", "ظ", "ط", "ض", "ص", "ش", "س", "ژ", "ز", "ر", "ذ", "د", "خ", "ح", "چ", "ج", "ث", "ت", "پ", "ب", "ا", "آ", "ء"
    ];

    public static readonly PERSIAN_CHARACTERS: string[] = [
        ...Constants.PERSIAN_ALPHABET,
        ...Constants.NUMBERS,
        ...Constants.PERSIAN_SIGNS,
    ];


    public static readonly ENGLISH_ALPHABET_LOWER: string[] = [
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "a", "s", "d", "f", "g", "h", "j", "k", "l",
        "z", "x", "c", "v", "b", "n", "m"
    ];

    public static readonly ENGLISH_ALPHABET_UPPER: string[] = [
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L",
        "Z", "X", "C", "V", "B", "N", "M"];

    public static readonly ENGLISH_ALPHABET: string[] = [...Constants.ENGLISH_ALPHABET_UPPER, ...Constants.ENGLISH_ALPHABET_LOWER]


}
export class DirectionDetector{

    private static readonly LTR_ALPHABET:string[] = [
        "A", "a", "B" , "b" , "C", "c" ,  "D" ,  "d" ,  "E" ,  "e" ,  "F" ,  "f" ,  "G" ,  "g" ,  "H" ,  "h" ,  "I" ,  "i" ,  "J" ,  "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z",
        "1" , "2", "3", "4", "5", "6", "7", "8", "9", "0" ," "
    ];
    private static readonly  RTL_ALPHABET: string[]= [
        "ی", "ه" , "و" ,"ن" , "م" ,"ل","گ","ک","ق","ف","غ","ع","ظ","ط","ض","ص","ش","س","ژ","ز","ر","ذ","د","خ","ح","چ","ج","ث","ت","پ","ب","ا","آ","ء" ,
        "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰" , " "
    ];


    public static detectDirection(text :string) : Direction{
        if(text.length <= 1){
            return Direction.LTR;
        }
        const firstChar = text[0];
        const secondChar = text[1];
        if(this.RTL_ALPHABET.indexOf(firstChar) !== -1 && this.RTL_ALPHABET.indexOf(secondChar) !== -1){
            return Direction.RTL;
        }
        return Direction.LTR;
    }

}

export enum Direction {
    RTL = "RTL",LTR = "LTR"
}
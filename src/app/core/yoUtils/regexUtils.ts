export class RegexUtils {
    public static getPattern(type): string {
        let regex;
        if (type == 'intRegex') regex = '/[0-9 -()+]+$/';
        //match any ip address
        if (type == 'ipRegex') regex = 'bd{1,3}.d{1,3}.d{1,3}.d{1,3}b';
        // match number in range 0-255
        if (type == 'num0to255Regex') regex = '^([01][0-9][0-9]|2[0-4][0-9]|25[0-5])$';
        //match number in range 0-999
        if (type == 'num0to999Regex') regex = '^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$';
        //match ints and floats/decimals
        if (type == 'floatRegex') regex = '[-+]?([0-9]*.[0-9]+|[0-9]+)';
        //Match Any number from 1 to 50 inclusive
        if (type == 'number1to50Regex') regex = '/(^[1-9]{1}$|^[1-4]{1}[0-9]{1}$|^50$)/gm';
        //match email address
        if (type == 'emailRegex') regex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$';
        //match credit card numbers
        if (type == 'creditCardRegex')
            regex =
                '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$';
        //match username
        if (type == 'usernameRegex') regex = '/^[a-z0-9_-]{3,16}$/';
        //match password 영문, 숫자 혼합하여 6~20자리 이내
        if (type == 'passwordRegex') regex = '/^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/';
        //Match 8 to 15 character string with at least one upper case letter, one lower case letter, and one digit (useful for passwords).
        if (type == 'passwordStrengthRegex') regex = '/((?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/gm';
        //match elements that could contain a phone number
        if (type == 'phoneNumber') regex = '/[0-9-()+]{3,20}/';
        //match date in format MM/DD/YYYY
        if (type == 'dateMMDDYYYRegex')
            regex = '^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)dd$';
        //match date in format DD/MM/YYYY
        if (type == 'dateDDMMYYYRegex')
            regex = '^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)dd$';
        //match a url slug (letters/numbers/hypens)
        if (type == 'urlslugRegex') regex = '/^[a-z0-9-]+$/';
        //if(type == "idRegex") regex  =/^[A-Za-z0-9+]{4,12}$/;  // 영문 대소문자 4자~12자
        // 아이디는 영어 소문자로 시작하는 4~20자 영어 소문자 또는 숫자이어야 합니다.
        if (type == 'idRegex') regex = '/^[a-z0-9]{5,19}$/g';
        if (type == 'call') regex = '/^d{2,3}-d{3,4}-d{4}$/';
        return regex;
    }
    public static getErrMsg(type): string {
        let errMsg: string;
        if (type == 'idRegex') {
            errMsg = '아이디는 영어 소문자로 시작하는 4~20자 영어 소문자 또는 숫자이어야 합니다.';
        } else if (type == 'passwordRegex') {
            errMsg = '비밀번호는 영문 소문자, 숫자혼합하여 6~20자리입니다.';
        }
        return errMsg;
    }
}

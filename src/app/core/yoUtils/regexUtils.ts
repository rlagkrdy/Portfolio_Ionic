export class RegexUtils {
    public static getPattern(type): string {
        let regex;
        if (type === '') {
            regex = '';
        }
        return regex;
    }
    public static getErrMsg(type): string {
        let errMsg: string;
        if (type === 'idRegex') {
            errMsg =
                '아이디는 영어 소문자로 시작하는 4~20자 영어 소문자 또는 숫자이어야 합니다.';
        } else if (type === 'passwordRegex') {
            errMsg = '비밀번호는 영문 소문자, 숫자혼합하여 6~20자리입니다.';
        }
        return errMsg;
    }
}

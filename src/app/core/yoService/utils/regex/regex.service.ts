import { Injectable } from '@angular/core';

@Injectable()
export class RegexUtils {
    constructor() {}

    public getPattern(type): RegExp {
        let regex: RegExp;
        if (type === 'id') {
            regex = /^[a-zA-Z][a-zA-Z0-9]{6,20}$/;
        } else if (type === 'pw') {
            regex = /^[a-z0-9_-]{6,18}$/;
        } else if (type === 'email') {
            regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        }
        return regex;
    }

    public getErrMsg(type): string {
        let errMsg: string;
        if (type === 'id') {
            errMsg =
                '아이디는 영어 소문자로 시작하는 4~20자 영어 소문자 또는 숫자이어야 합니다.';
        } else if (type === 'pw') {
            errMsg = '비밀번호는 영문 소문자, 숫자혼합하여 6~18자리입니다.';
        } else if (type === 'email') {
            errMsg = '이메일은 xxxx@xxx.xxx 형식이여 합니다.';
        }
        return errMsg;
    }
}

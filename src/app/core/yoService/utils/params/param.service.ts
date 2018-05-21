import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { RegexUtils } from '../regex/regex.service';

@Injectable()
export class ParamUtils {
    constructor(private ru: RegexUtils) {}

    // url string param convert to json object
    public urlStrParseToObj(queryString: string): any {
        if (!queryString) {
            return;
        }
        const pairs: Array<string> = (queryString[0] === '?'
            ? queryString.substr(1)
            : queryString
        ).split('&');
        return pairs.reduce(this.convertJson, {});
    }

    // convert to json object
    private convertJson(accumulator: any, item: string): any {
        const keyValue: Array<string> = item.split('=');
        accumulator[keyValue[0]] = keyValue[1];
        return accumulator;
    }

    // json object convert to url string param
    public objConvertToUrlStr(queryObj: any): string {
        let str: string = '?';
        str += this.convertString(queryObj, '=', '&');
        return str;
    }

    private convertString(queryObj: any, joinDemi1: string = '', joinDemi2: string = '') {
        return Object.keys(queryObj)
            .map(prop => {
                return [prop, queryObj[prop]].map(encodeURIComponent).join(joinDemi1);
            })
            .join(joinDemi2);
    }

    // json object convert to location search string
    public objConvertToSearch(queryObj: object): string {
        const str = this.convertString(queryObj, '=', '&');
        return str;
    }

    // angular form Filter
    public formFilter(_forms: NgForm, _filter: string): boolean {
        const idObj: any = _forms['_directives'].filter(obj => {
                if ('name' in obj && obj['name'] === _filter) {
                    return true;
                } else {
                    return false;
                }
            }),
            isValid: boolean = this.formValid(idObj);
        return isValid;
    }

    // form 유효성 검사
    public formValid(formArr: Array<any>): boolean {
        let isVaild: boolean = true;
        formArr.forEach((item, index, arr) => {
            const errorObj = item.errors,
                targetEle: any = document.querySelector('#' + item.name);
            if (!targetEle) {
                alert(`${item.name}의 id와 name은 같아야 합니다.`);
                return;
            }

            const isRequired: any = targetEle.getAttribute('required'),
                patternName: string = targetEle.getAttribute('data-patterns');
            let targetName: string = targetEle.getAttribute('data-target'),
                actionName: string = '입력';

            if (isRequired === null) {
                return;
            }

            if (!targetName) {
                alert(
                    `${item.name}에 validation대상에 data-target속성으로 명칭을 같이 넘겨주세요.`
                );
                return;
            }

            targetName = this.koreanWordLastValid(targetName);

            if (targetEle.tagName !== 'INPUT') {
                actionName = '선택';
            }

            for (const key of Object.keys(errorObj)) {
                let msg: string;
                if (key === 'required') {
                    msg = `${targetName} ${actionName}해주시기 바랍니다`;
                }
                if (key === 'pattern') {
                    msg = `${targetName} 형식의 맞게 ${actionName}해주시기 바랍니다`;
                    if (patternName) {
                        msg = this.ru.getErrMsg(patternName);
                    }
                }
                swal('', msg, 'error').then(() => {
                    targetEle.focus();
                });
                isVaild = false;
                return;
            }
            if (!isVaild) {
                return false;
            }
        });

        return isVaild;
    }

    // url Parameter Setting 및 location reloadState 처리
    public setUrlHis(paramObj: any): void {
        let changeUrl: string = window.location.pathname,
            currentParam: any = this.urlStrParseToObj(window.location.search);

        for (const key of Object.keys(paramObj)) {
            if (!currentParam) {
                currentParam = {};
            }
            if (paramObj[key] === 'null') {
                paramObj[key] = '';
            }
            currentParam[key] = paramObj[key];
        }

        const urlParams = this.objConvertToUrlStr(currentParam);

        changeUrl += urlParams;

        const obj = { Title: '', ChangeUrl: changeUrl };
        const parseQuery = this.urlStrParseToObj(window.location.search);
        window.history.replaceState(null, obj.Title.toString(), obj.ChangeUrl);
    }

    // url Parameter 초기화
    public resetUrlHis(): void {
        const changeUrl: string = window.location.pathname;
        window.history.replaceState(null, '', changeUrl);
    }

    // 한국어 단어 을를 구분
    public koreanWordLastValid(_word: string): string {
        let word = _word;
        const lastChar = word.charCodeAt(word.length - 1),
            seletedValue = (lastChar - 0xac00) % 28 > 0 ? '을' : '를';
        word += seletedValue;
        return word;
    }

    // 첫 번째 단어가 null 이면 두번째 단어를 리턴
    public strIfNull(_str: string, _text?: string): string {
        const ct: string = _text ? _text : '';
        return _str ? _str : '' + ct + '';
    }

    public moneyFommat(_money: string | number): string {
        if (_money !== null || _money !== '') {
            return _money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
        } else {
            return '0원';
        }
    }
}

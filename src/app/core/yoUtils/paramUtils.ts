import swal from 'sweetalert2';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { RegexUtils } from './regexUtils';

export class ParamsUtils {
    // url파라미터를 javascript Object로 변환
    public static urlStrParseToObj(queryString: string) {
        if (!queryString) {
            return;
        }
        const query = {},
            pairs = (queryString[0] === '?'
                ? queryString.substr(1)
                : queryString
            ).split('&');

        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(
                pair[1] || ''
            );
        }
        return query;
    }

    // javascript Object를 Url Parameter로 변환
    public static objConvertToUrlStr(queryObj: object) {
        const str =
            '?' +
            Object.keys(queryObj)
                .map(prop => {
                    return [prop, queryObj[prop]]
                        .map(encodeURIComponent)
                        .join('=');
                })
                .join('&');
        return str;
    }

    // javascript Object를 location Search로 변환
    public static objConvertToSearch(queryObj: object) {
        console.log(queryObj);
        const str = Object.keys(queryObj)
            .map(prop => {
                return [prop, queryObj[prop]].join('=');
            })
            .join('&');
        return str;
    }

    // form 유효성 검사
    public static formValid(formArr: Array<any>): boolean {
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
                    `${
                        item.name
                    }에 validation대상에 data-target속성으로 명칭을 같이 넘겨주세요.`
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
                        msg = RegexUtils.getErrMsg(patternName);
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

    public static koreanWordLastValid(_word: string): string {
        let word = _word;
        const lastChar = word.charCodeAt(word.length - 1),
            seletedValue = (lastChar - 0xac00) % 28 > 0 ? '을' : '를';
        word += seletedValue;
        return word;
    }

    // url Parameter Setting 및 location reloadState 처리
    public static setUrlHis(paramObj: any): void {
        let changeUrl: string = window.location.pathname,
            currentParam: any = ParamsUtils.urlStrParseToObj(
                window.location.search
            );

        for (const key of Object.keys(paramObj)) {
            if (!currentParam) {
                currentParam = {};
            }
            if (paramObj[key] === 'null') {
                paramObj[key] = '';
            }
            currentParam[key] = paramObj[key];
        }

        const urlParams = ParamsUtils.objConvertToUrlStr(currentParam);

        changeUrl += urlParams;

        const obj = { Title: '', ChangeUrl: changeUrl };
        const parseQuery = ParamsUtils.urlStrParseToObj(window.location.search);
        window.history.replaceState(null, obj.Title.toString(), obj.ChangeUrl);
    }

    // url Parameter 초기화
    public static resetUrlHis(): void {
        const changeUrl: string = window.location.pathname;
        window.history.replaceState(null, '', changeUrl);
    }

    public static formFilter(_forms: NgForm, _filter: string): boolean {
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

    public static ifNull(_str: string, _text?: string): string {
        const ct: string = _text ? _text : '';
        return _str ? _str : '' + ct + '';
    }

    public static moneyFommat(_money: string): string {
        if (_money !== null || _money !== '') {
            return (
                _money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원'
            );
        } else {
            return '0원';
        }
    }
}

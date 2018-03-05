import swal from 'sweetalert2';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { RegexUtils } from './regexUtils';

export class ParamsUtils {
    //url파라미터를 javascript Object로 변환
    public static urlStrParseToObj(queryString: string) {
        if (!queryString) {
            return;
        }
        var query = {};
        var pairs = (queryString[0] === '?'
            ? queryString.substr(1)
            : queryString
        ).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(
                pair[1] || ''
            );
        }
        return query;
    }

    //javascript Object를 Url Parameter로 변환
    public static objConvertToUrlStr(queryObj: object) {
        var str =
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

    //javascript Object를 location Search로 변환
    public static objConvertToSearch(queryObj: object) {
        console.log(queryObj);
        var str = Object.keys(queryObj)
            .map(prop => {
                return [prop, queryObj[prop]].join('=');
            })
            .join('&');
        return str;
    }

    //form 유효성 검사
    public static formValid(formArr: Array<any>): boolean {
        let isVaild: boolean = true;
        formArr.forEach((item, index, arr) => {
            let errorObj = item.errors,
                targetEle: any = document.querySelector('#' + item.name);
            if (!targetEle) {
                alert(`${item.name}의 id와 name은 같아야 합니다.`);
                return;
            }

            let isRequired: any = targetEle.getAttribute('required'),
                targetName: string = targetEle.getAttribute('data-target'),
                patternName: string = targetEle.getAttribute('data-patterns'),
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

            for (let key in errorObj) {
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
        let word = _word,
            lastChar = word.charCodeAt(word.length - 1),
            seletedValue = (lastChar - 0xac00) % 28 > 0 ? '을' : '를';
        word += seletedValue;
        return word;
    }

    //url Parameter Setting 및 location reloadState 처리
    public static setUrlHis(paramObj: any): void {
        let changeUrl: string = window.location.pathname,
            currentParam: any = ParamsUtils.urlStrParseToObj(
                window.location.search
            );

        for (let key in paramObj) {
            if (!currentParam) {
                currentParam = {};
            }
            if (paramObj[key] === 'null') {
                paramObj[key] = '';
            }
            currentParam[key] = paramObj[key];
        }

        let urlParams = ParamsUtils.objConvertToUrlStr(currentParam);

        changeUrl += urlParams;

        var obj = { Title: '', ChangeUrl: changeUrl };
        let parseQuery = ParamsUtils.urlStrParseToObj(window.location.search);
        window.history.replaceState(null, obj.Title.toString(), obj.ChangeUrl);
    }

    //url Parameter 초기화
    public static resetUrlHis(): void {
        let changeUrl: string = window.location.pathname;
        window.history.replaceState(null, '', changeUrl);
    }

    public static formFilter(forms: NgForm, filter: string): boolean {
        let idObj: any = forms['_directives'].filter(obj => {
                if ('name' in obj && obj['name'] === filter) {
                    return true;
                } else {
                    return false;
                }
            }),
            isValid: boolean = this.formValid(idObj);
        return isValid;
    }

    public static ifNull(str: string, text?: string): string {
        let ct = text ? text : '';
        return str ? str : ' ' + ct + ' ';
    }

    public static moneyFommat(x: string): string {
        if (x != null) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원';
        } else {
            return '0원';
        }
    }

    public static imgIsWidth(item: any): boolean {
        let isWidth: boolean = true;
        if (!item.ME_CSS_TYPE) {
            isWidth = item.ME_ROW_SIZE > item.ME_COL_SIZE ? true : false;
        } else {
            isWidth = item.ME_CSS_TYPE === 'WIDTH' ? true : false;
        }
        return isWidth;
    }
}

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
        str += this.queryObjConvertString(queryObj, '=', '&');
        return str;
    }

    // json object convert to location search string
    public objConvertToSearch(queryObj: object): string {
        const str = this.queryObjConvertString(queryObj, '=', '&');
        return str;
    }

    private queryObjConvertString(
        queryObj: any,
        joinDemi1: string = '',
        joinDemi2: string = ''
    ) {
        return Object.keys(queryObj)
            .map(prop => {
                return [prop, queryObj[prop]]
                    .map(encodeURIComponent)
                    .join(joinDemi1);
            })
            .join(joinDemi2);
    }

    // angular form Filter
    public formFilter(_forms: NgForm, _filter?: string): boolean {
        const idObj: any = _forms['_directives'].filter(obj => {
                if ('name' in obj && obj['name'] === _filter) {
                    return true;
                } else {
                    return false;
                }
            }),
            isValid: boolean = this.customFormValid(idObj);
        return isValid;
    }

    // custom form 유효성 검사
    public customFormValid(formArr: Array<any>): boolean {
        const result: boolean = !formArr.some(item => item.errors !== null);
        if (result) {
            return true;
        }

        const firstFilter = formArr
            .filter(item => item.errors !== null)
            .reduce(this.makeTargetOption.bind(this), [])
            .some(this.formSwal);

        return result;
    }

    private makeTargetOption(preItem: Array<any>, currItem: any): Array<any> {
        const targetEle: any = document.querySelector('#' + currItem.name);
        const option = {
            errorOption: currItem.errors,
            targetEle: targetEle,
            patternName: targetEle.getAttribute('data-patterns'),
            targetName: this.koreanWordLastValid(
                targetEle.getAttribute('data-target')
            ),
            actionName: targetEle.tagName !== 'INPUT' ? '선택' : '입력'
        };
        preItem.push(option);
        return preItem;
    }

    private formSwal(item): void {
        Object.keys(item.errorOption).forEach(key => {
            let msg: string;
            if (key === 'required') {
                msg = `${item.targetName} ${item.actionName}해주시기 바랍니다`;
            }
            if (key === 'pattern') {
                msg = `${item.targetName} 형식의 맞게 ${
                    item.actionName
                }해주시기 바랍니다`;
                if (item.patternName) {
                    msg = this.ru.getErrMsg(item.patternName);
                }
            }
            swal('', msg, 'error').then(() => {
                item.targetEle.focus();
            });
        });
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
            return (
                _money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
            );
        } else {
            return '0원';
        }
    }
}

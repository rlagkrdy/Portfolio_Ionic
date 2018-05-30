import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { RegexUtils } from '../regex/regex.service';
import { ParamUtils } from '../params/param.service';
import swal from 'sweetalert2';

@Injectable()
export class FormUtils {
    constructor(private _ru: RegexUtils, private _pu: ParamUtils) {}

    // angular form Filter
    public formFilter(_forms: NgForm, _filter?: string): boolean {
        const idObj: any = _forms['_directives'].filter(item => {
                if ('name' in item && item['name'] === _filter) {
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

        const firstFilter = new Array(
            formArr.filter(item => item.errors !== null)[0]
        );
        firstFilter
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
            targetName: this._pu.koreanWordLastValid(
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
                    msg = this._ru.getErrMsg(item.patternName);
                }
            }
            swal('', msg, 'error').then(() => {
                item.targetEle.focus();
            });
        });
    }
}

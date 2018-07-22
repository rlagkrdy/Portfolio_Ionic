import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SearchObj } from '../../yoComponent/yo-search/yo-search.component';

@Injectable()
export class DateCtrl {
    constructor() {}

    // 1. _objArr배열중에서 type이 date인것을 골라낸다
    // 2. SearchObj타입의 객체의 name과 value로 각각 값을 집어 넣는다.
    init(_objArr: Array<any>, _form: NgForm | any, _func: Function): void {
        _objArr.filter(pItem => pItem.type === 'date').forEach(cItem => {
            if (!cItem.value) {
                this.setIeValue(_func, _form, cItem.id);
                return;
            }

            _func(_form, cItem.id, cItem.value);
        });
    }

    setRange(_form: NgForm, name: string, value: string): void {
        const dateName: Array<string> = ['_ST', '_ED'];
        dateName.forEach(dateItem => {
            _form.controls[name + dateItem].setValue(value);
        });
    }

    setOne(_form: NgForm, name: string, value: string): void {
        _form.controls[name].setValue(value);
    }

    private setIeValue(func: Function, _form: NgForm, name: string): void {
        func(_form, name, '');
    }
}

import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SearchObj } from '../../yoComponent/yo-search/yo-search.component';

@Injectable()
export class DateCtrl {
    constructor() {}

    // 1. _searchArr배열중에서 type이 date인것을 골라낸다
    // 2. SearchObj타입의 객체의 name과 value로 각각 값을 집어 넣는다.
    init(_searchArr: Array<any>, _form: NgForm, _func: Function): void {
        _searchArr.filter(pItem => pItem.type === 'date').forEach(cItem => {
            if (!cItem.value) {
                return;
            }
            _func(_form, cItem.id, cItem.value);
        });
    }

    setRange(_form: NgForm, name: string, value: string) {
        const dateName: Array<string> = ['_ST', '_ED'];
        dateName.forEach(dateItem => {
            _form.controls[name + dateItem].setValue(value);
        });
    }

    setOne(_form: NgForm, name: string, value: string) {
        _form.controls[name].setValue(value);
    }
}

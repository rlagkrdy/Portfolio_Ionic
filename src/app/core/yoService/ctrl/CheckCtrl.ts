import { QueryList, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckbox } from '@angular/material';
import { SearchObj } from '../../yoComponent/yo-search/yo-search.component';

@Injectable()
export class CheckCtrl {
    constructor() {}

    // checkBox Ctrl
    do(
        _searchArr: Array<SearchObj>,
        _matchk: QueryList<MatCheckbox>,
        _form: NgForm,
        _func: Function
    ): void {
        _searchArr.filter(item => item.type === 'check').forEach(checkArr_item => {
            _func(
                _form,
                checkArr_item,
                _matchk.filter(matchk_item => matchk_item.name === checkArr_item.name)
            );
        });
    }

    // checkBox Set
    set(_form: NgForm, checkArr_item: SearchObj, targetArr: Array<MatCheckbox>): void {
        const demiObj = _form.value[checkArr_item.name],
            demiValue: number = !demiObj
                ? parseInt(checkArr_item.value, 10)
                : parseInt(demiObj, 10);
        targetArr.forEach(target_item => {
            const elValue: number = parseInt(target_item.value, 10);
            target_item.checked = (demiValue & elValue) !== 0 ? true : false;
        });
    }
    // checkBox Get
    get(_form: NgForm, checkArr_item: SearchObj, targetArr: Array<MatCheckbox>): void {
        let chkValue: number = 0;
        targetArr.forEach(target_item => {
            chkValue += target_item.checked ? parseInt(target_item.value, 10) : 0;
        });
        _form.value[checkArr_item.name] =
            _form.value[checkArr_item.name] !== undefined ? chkValue : 0;
    }
}

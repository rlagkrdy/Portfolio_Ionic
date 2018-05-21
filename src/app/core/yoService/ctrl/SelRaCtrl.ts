import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SearchObj } from '../../yoComponent/yo-search/yo-search.component';

@Injectable()
export class SelRaCtrl {
    private isTypes: RegExp = new RegExp(/select|radio/);
    constructor() {}

    // select, radio 타입일 때 value가 data중에 값이 없으면 첫번째 값으로 세팅한다.
    // _isReset값이 true이면 모든 값을 ''으로 리셋한다.
    defaultValue(_searchObj: Array<SearchObj>, _fun?: Function): Array<SearchObj> {
        if (_fun) {
            _fun(_searchObj);
        }
        _searchObj.filter(item => this.isTypes.test(item.type)).map(pItem => {
            const valueAr = pItem.data.filter(cItem => cItem.value === pItem.value);
            pItem.value = this.valid(pItem.value, valueAr) ? pItem.data[0].value : valueAr[0].value;
        });
        return _searchObj;
    }

    reset(_searchObj: Array<SearchObj>): Array<SearchObj> {
        _searchObj.map(item => (item.value = ''));
        return _searchObj;
    }

    private valid(_value: string, _Arr: Array<any>): boolean {
        return _value === '' || _value === null || _Arr.length === 0;
    }
}

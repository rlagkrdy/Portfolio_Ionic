import { Injectable } from '@angular/core';

@Injectable()
export class FormatterUtils {
    constructor() {}

    public moneyFommat(_money: any): string {
        _money = typeof _money === 'object' ? _money.value : _money;
        if (_money !== null || _money !== '') {
            return (
                _money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
            );
        } else {
            return '0원';
        }
    }
}

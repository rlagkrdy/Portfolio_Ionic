import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class FormatterUtils {
    constructor(private _sanitizer: DomSanitizer) {}

    moneyFommat(_money: any): string {
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

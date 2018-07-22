import { Injectable } from '@angular/core';

@Injectable()
export class DateUtils {
    constructor() {}

    getYear(_stYear: number = 1960): Array<number> {
        const yearArr: Array<number> = [],
            nowYear = new Date().getFullYear();

        for (let i = nowYear; i >= _stYear; i -= 1) {
            yearArr.push(i);
        }

        return yearArr;
    }

    getDay(_year?: number, _month?: number): Array<number> {
        const dayArr: Array<number> = [],
            monthIndex: number = _month ? _month : 1,
            monthDayArray: Array<number> = [
                31,
                28,
                31,
                30,
                31,
                30,
                31,
                31,
                30,
                31,
                30,
                31
            ];

        if (_month === 2) {
            if ((_year % 4 === 0 && _year % 100 !== 0) || _year % 400 === 0) {
                monthDayArray[1] = 29;
            }
        }

        for (let i = 1; i <= monthDayArray[monthIndex - 1]; i += 1) {
            dayArr.push(i);
        }
        return dayArr;
    }

    dateStrToArray(_date: string, _demiStr: string): Array<string> {
        if (!_date || !_demiStr || _date.indexOf(_demiStr) === -1) {
            return null;
        }
        return _date.split(_demiStr);
    }

    getTodayText(): string {
        const dayOfWeekArr: string[] = [
            '(일)',
            '(월)',
            '(화)',
            '(수)',
            '(목)',
            '(금)',
            '(토)'
        ];

        const today: Date = new Date(),
            yy: number = today.getFullYear(),
            mm: number = today.getMonth() + 1,
            dd: number = today.getDate(),
            dayOfWeek: string = dayOfWeekArr[today.getDay()];
        return yy + '년 ' + mm + '월 ' + dd + '일 ' + dayOfWeek;
    }
}

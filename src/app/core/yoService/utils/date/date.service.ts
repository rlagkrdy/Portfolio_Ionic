import { Injectable } from '@angular/core';

@Injectable()
export class DateUtils {
    constructor() {}

    public getYear(): Array<number> {
        const yearArr: Array<number> = [],
            nowYear = new Date().getFullYear(),
            yearST: number = 1960;
        for (let i = nowYear; i >= yearST; i -= 1) {
            yearArr.push(i);
        }
        return yearArr;
    }

    public getDay(_year?: number, _month?: number): Array<number> {
        const dayArr: Array<number> = [],
            monthDayArray: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let monthIndex: number = 0;

        if (_month) {
            monthIndex = _month;
        }

        if (_month === 1) {
            if ((_year % 4 === 0 && _year % 100 !== 0) || _year % 400 === 0) {
                monthDayArray[1] = 29;
            }
        }

        for (let i = 1; i <= monthDayArray[monthIndex]; i += 1) {
            dayArr.push(i);
        }
        return dayArr;
    }

    public dateStrToArray(_date: string, _demiStr: string): Array<string> {
        if (!_date || !_demiStr) {
            alert('날짜 문자열 및 구분자를 넘겨주여야 합니다.');
            return;
        }
        if (_date.indexOf(_demiStr) === -1) {
            alert(`날짜 문자열에 구분자 : ${_demiStr}가 없습니다.`);
            return;
        }

        const dateArr: Array<string> = _date.split(_demiStr),
            monthArr: Array<string> = dateArr[1].split('');

        if (monthArr[0] === '0') {
            dateArr[1] = monthArr[1];
        }

        return dateArr;
    }

    public getTodayText(): string {
        const today: Date = new Date(),
            mm: number = today.getMonth() + 1,
            dd: number = today.getDate();
        let dayOfWeek: string = null,
            dateText: string;
        switch (today.getDay()) {
            case 0:
                dayOfWeek = '(일)';
                break;
            case 1:
                dayOfWeek = '(월)';
                break;
            case 2:
                dayOfWeek = '(화)';
                break;
            case 3:
                dayOfWeek = '(수)';
                break;
            case 4:
                dayOfWeek = '(목)';
                break;
            case 5:
                dayOfWeek = '(금)';
                break;
            case 6:
                dayOfWeek = '(토)';
                break;
        }
        dateText = mm + '월 ' + dd + '일' + dayOfWeek;
        return dateText;
    }
}

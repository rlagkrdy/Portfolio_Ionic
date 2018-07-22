import { TestBed, inject } from '@angular/core/testing';

import { DateUtils } from './date.service';

describe('DateService', () => {
    let dateUtils: DateUtils;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DateUtils]
        });
        dateUtils = TestBed.get(DateUtils);
    });

    it('should be created', () => {
        expect(dateUtils).toBeTruthy();
    });

    it('getYear(_stYaer?) :: _stYaer을 안넘겨 주면 올해부터 1960년도 까지 배열로 return', () => {
        let result: Array<number>;
        result = dateUtils.getYear();
        expect(result[0]).toBe(new Date().getFullYear());
        expect(result[result.length - 1]).toBe(1960);
    });

    it('getYear(_stYaer?) :: _stYaer을 넘겨 주면 올해 부터 _stYaer년도 까지 배열로 return', () => {
        let result: Array<number>;
        result = dateUtils.getYear(1980);
        expect(result[0]).toBe(new Date().getFullYear());
        expect(result[result.length - 1]).toBe(1980);
    });

    it('getDay(_year?, _month?) :: 아무것도 안넘기면 1~31을 가지고 있는 배열 return', () => {
        let result: Array<number>;
        result = dateUtils.getDay();
        expect(result.length).toBe(31);
    });

    it('getDay(_year?, _month?) :: _year, _month를 넘기면 해당 연도,월의 해당 일 만큼의 배열 return', () => {
        let result: Array<number>;
        result = dateUtils.getDay(2017, 2);
        expect(result.length).toBe(28);
        expect(result[result.length - 1]).toBe(28);
    });

    it('dateStrToArray(_date, _demiStr) :: 2018-01-01, -을 매개변수로 넘기면 [2018,01,01] 배열 return', () => {
        let result: Array<string>;
        result = dateUtils.dateStrToArray('2018-01-01', '-');
        expect(result.length).toBe(3);
        expect(result[0]).toBe('2018');
        expect(result[1]).toBe('01');
        expect(result[2]).toBe('01');
    });

    it('getTodayText() :: 오늘 날짜를 string으로 return', () => {
        let result: string;
        result = dateUtils.getTodayText();
        expect(result).toBe('2018년 7월 23일 (월)');
    });
});

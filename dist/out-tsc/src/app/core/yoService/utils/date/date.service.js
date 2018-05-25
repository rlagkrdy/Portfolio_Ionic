"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DateUtils = /** @class */ (function () {
    function DateUtils() {
    }
    DateUtils.prototype.getYear = function () {
        var yearArr = [], nowYear = new Date().getFullYear(), yearST = 1960;
        for (var i = nowYear; i >= yearST; i -= 1) {
            yearArr.push(i);
        }
        return yearArr;
    };
    DateUtils.prototype.getDay = function (_year, _month) {
        var dayArr = [], monthDayArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var monthIndex = 0;
        if (_month) {
            monthIndex = _month;
        }
        if (_month === 1) {
            if ((_year % 4 === 0 && _year % 100 !== 0) || _year % 400 === 0) {
                monthDayArray[1] = 29;
            }
        }
        for (var i = 1; i <= monthDayArray[monthIndex]; i += 1) {
            dayArr.push(i);
        }
        return dayArr;
    };
    DateUtils.prototype.dateStrToArray = function (_date, _demiStr) {
        if (!_date || !_demiStr) {
            alert('날짜 문자열 및 구분자를 넘겨주여야 합니다.');
            return;
        }
        if (_date.indexOf(_demiStr) === -1) {
            alert("\uB0A0\uC9DC \uBB38\uC790\uC5F4\uC5D0 \uAD6C\uBD84\uC790 : " + _demiStr + "\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.");
            return;
        }
        var dateArr = _date.split(_demiStr), monthArr = dateArr[1].split('');
        if (monthArr[0] === '0') {
            dateArr[1] = monthArr[1];
        }
        return dateArr;
    };
    DateUtils.prototype.getTodayText = function () {
        var today = new Date(), mm = today.getMonth() + 1, dd = today.getDate();
        var dayOfWeek = null, dateText;
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
    };
    DateUtils = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], DateUtils);
    return DateUtils;
}());
exports.DateUtils = DateUtils;
//# sourceMappingURL=date.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonCode = /** @class */ (function () {
    function CommonCode() {
    }
    CommonCode.getTitle = function (_type) {
        var result;
        if (_type === 'usr') {
            result = '회원';
        }
        else if (_type === 'comp') {
            result = '회사';
        }
        else if (_type === 'prod') {
            result = '상품';
        }
        else if (_type === 'reserv') {
            result = '예약';
        }
        else if (_type === 'room') {
            result = '스터디룸';
        }
        return result;
    };
    CommonCode.getCode = function (_type) {
        var result;
        if (_type === 'sns') {
            result = [
                { name: '전체', value: '' },
                { name: '네이버', value: 'NAVER' },
                { name: '페이스북', value: 'FACEBOOK' },
                { name: '구글', value: 'GOOGLE' }
            ];
        }
        else if (_type === 'prod') {
            result = [];
        }
        else if (_type === 'reserv') {
            result = [];
        }
        return result;
    };
    return CommonCode;
}());
exports.CommonCode = CommonCode;
//# sourceMappingURL=commonCode.js.map
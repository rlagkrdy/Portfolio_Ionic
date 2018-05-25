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
var RegexUtils = /** @class */ (function () {
    function RegexUtils() {
    }
    RegexUtils.prototype.getPattern = function (type) {
        var regex;
        if (type === '') {
            regex = '';
        }
        return regex;
    };
    RegexUtils.prototype.getErrMsg = function (type) {
        var errMsg;
        if (type === 'idRegex') {
            errMsg = '아이디는 영어 소문자로 시작하는 4~20자 영어 소문자 또는 숫자이어야 합니다.';
        }
        else if (type === 'passwordRegex') {
            errMsg = '비밀번호는 영문 소문자, 숫자혼합하여 6~20자리입니다.';
        }
        return errMsg;
    };
    RegexUtils = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], RegexUtils);
    return RegexUtils;
}());
exports.RegexUtils = RegexUtils;
//# sourceMappingURL=regex.service.js.map
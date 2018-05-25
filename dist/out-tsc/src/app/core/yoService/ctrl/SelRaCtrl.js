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
var SelRaCtrl = /** @class */ (function () {
    function SelRaCtrl() {
        this.isTypes = new RegExp(/select|radio/);
    }
    // select, radio 타입일 때 value가 data중에 값이 없으면 첫번째 값으로 세팅한다.
    // _isReset값이 true이면 모든 값을 ''으로 리셋한다.
    SelRaCtrl.prototype.defaultValue = function (_searchObj, _fun) {
        var _this = this;
        if (_fun) {
            _fun(_searchObj);
        }
        _searchObj.filter(function (item) { return _this.isTypes.test(item.type); }).map(function (pItem) {
            var valueAr = pItem.data.filter(function (cItem) { return cItem.value === pItem.value; });
            pItem.value = _this.valid(pItem.value, valueAr) ? pItem.data[0].value : valueAr[0].value;
        });
        return _searchObj;
    };
    SelRaCtrl.prototype.reset = function (_searchObj) {
        _searchObj.map(function (item) { return (item.value = ''); });
        return _searchObj;
    };
    SelRaCtrl.prototype.valid = function (_value, _Arr) {
        return _value === '' || _value === null || _Arr.length === 0;
    };
    SelRaCtrl = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], SelRaCtrl);
    return SelRaCtrl;
}());
exports.SelRaCtrl = SelRaCtrl;
//# sourceMappingURL=SelRaCtrl.js.map
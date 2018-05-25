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
var DateCtrl = /** @class */ (function () {
    function DateCtrl() {
    }
    // 1. _searchArr배열중에서 type이 date인것을 골라낸다
    // 2. SearchObj타입의 객체의 name과 value로 각각 값을 집어 넣는다.
    DateCtrl.prototype.do = function (_searchArr, _form, _func) {
        _searchArr.filter(function (pItem) { return pItem.type === 'date'; }).forEach(function (cItem) {
            if (!cItem.value) {
                return;
            }
            _func(_form, cItem.name, cItem.value);
        });
    };
    DateCtrl.prototype.set = function (_form, name, value) {
        var dateName = ['_ST', '_ED'];
        dateName.forEach(function (dateItem) {
            _form.controls[name + dateItem].setValue(value);
        });
    };
    DateCtrl = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], DateCtrl);
    return DateCtrl;
}());
exports.DateCtrl = DateCtrl;
//# sourceMappingURL=DateCtrl.js.map
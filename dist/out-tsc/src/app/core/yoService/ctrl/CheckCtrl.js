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
var CheckCtrl = /** @class */ (function () {
    function CheckCtrl() {
    }
    // checkBox Ctrl
    CheckCtrl.prototype.do = function (_searchArr, _matchk, _form, _func) {
        _searchArr.filter(function (item) { return item.type === 'check'; }).forEach(function (checkArr_item) {
            _func(_form, checkArr_item, _matchk.filter(function (matchk_item) { return matchk_item.name === checkArr_item.name; }));
        });
    };
    // checkBox Set
    CheckCtrl.prototype.set = function (_form, checkArr_item, targetArr) {
        var demiObj = _form.value[checkArr_item.name], demiValue = !demiObj
            ? parseInt(checkArr_item.value, 10)
            : parseInt(demiObj, 10);
        targetArr.forEach(function (target_item) {
            var elValue = parseInt(target_item.value, 10);
            target_item.checked = (demiValue & elValue) !== 0 ? true : false;
        });
    };
    // checkBox Get
    CheckCtrl.prototype.get = function (_form, checkArr_item, targetArr) {
        var chkValue = 0;
        targetArr.forEach(function (target_item) {
            chkValue += target_item.checked ? parseInt(target_item.value, 10) : 0;
        });
        _form.value[checkArr_item.name] =
            _form.value[checkArr_item.name] !== undefined ? chkValue : 0;
    };
    CheckCtrl = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CheckCtrl);
    return CheckCtrl;
}());
exports.CheckCtrl = CheckCtrl;
//# sourceMappingURL=CheckCtrl.js.map
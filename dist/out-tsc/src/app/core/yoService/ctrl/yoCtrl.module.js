"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SelRaCtrl_1 = require("./SelRaCtrl");
var DateCtrl_1 = require("./DateCtrl");
var CheckCtrl_1 = require("./CheckCtrl");
var YoCtrlModule = /** @class */ (function () {
    function YoCtrlModule() {
    }
    YoCtrlModule = __decorate([
        core_1.NgModule({
            providers: [CheckCtrl_1.CheckCtrl, SelRaCtrl_1.SelRaCtrl, DateCtrl_1.DateCtrl],
            exports: []
        })
    ], YoCtrlModule);
    return YoCtrlModule;
}());
exports.YoCtrlModule = YoCtrlModule;
//# sourceMappingURL=yoCtrl.module.js.map
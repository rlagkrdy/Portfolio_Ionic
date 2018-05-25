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
var forms_1 = require("@angular/forms");
var YoDetailComponent = /** @class */ (function () {
    function YoDetailComponent() {
    }
    YoDetailComponent.prototype.ngOnInit = function () { };
    // 부모로 부터 데이터 받으면 호출
    YoDetailComponent.prototype.ngOnChanges = function (changes) {
        if (changes.detailObjData && changes.detailObjData.currentValue) {
            this.setObjValue();
        }
    };
    // 부모로 부터 데이터 세팅
    YoDetailComponent.prototype.setObjValue = function () {
        var _this = this;
        this.detailObj.forEach(function (item, index, array) {
            if (item['id'] in _this.detailObjData) {
                item['value'] = _this.detailObjData[item['id']];
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], YoDetailComponent.prototype, "detailObj", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], YoDetailComponent.prototype, "detailObjData", void 0);
    __decorate([
        core_1.ViewChild('detailForm'),
        __metadata("design:type", forms_1.NgForm)
    ], YoDetailComponent.prototype, "detailForm", void 0);
    YoDetailComponent = __decorate([
        core_1.Component({
            selector: 'yo-detail',
            templateUrl: './yo-detail.component.html',
            styleUrls: ['./yo-detail.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], YoDetailComponent);
    return YoDetailComponent;
}());
exports.YoDetailComponent = YoDetailComponent;
//# sourceMappingURL=yo-detail.component.js.map
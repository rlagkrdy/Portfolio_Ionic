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
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var param_service_1 = require("../../yoService/utils/params/param.service");
var CheckCtrl_1 = require("../../yoService/ctrl/CheckCtrl");
var DateCtrl_1 = require("../../yoService/ctrl/DateCtrl");
var SelRaCtrl_1 = require("../../yoService/ctrl/SelRaCtrl");
var YoSearchComponent = /** @class */ (function () {
    // 라우터로 부터 url 파람 가지고옴
    function YoSearchComponent(_paramUtils, _router, _element, _chkCtrl, _dateCtrl, _selRaCtrl) {
        var _this = this;
        this._paramUtils = _paramUtils;
        this._router = _router;
        this._element = _element;
        this._chkCtrl = _chkCtrl;
        this._dateCtrl = _dateCtrl;
        this._selRaCtrl = _selRaCtrl;
        this.searchClick = new core_1.EventEmitter();
        this.formIsShow = true;
        var urlParams = this._router['currentUrlTree'].queryParams;
        setTimeout(function () {
            if (!_this.formIsShow) {
                return;
            }
            _this._dateCtrl.do(_this.searchObj, _this.searchForm, _this._dateCtrl.set);
            _this.formSet(urlParams, _this.searchForm);
            _this._chkCtrl.do(_this.searchObj, _this.matchk, _this.searchForm, _this._chkCtrl.set);
        }, 0);
    }
    YoSearchComponent.prototype.ngOnInit = function () {
        this.searchObj = this._selRaCtrl.defaultValue(this.searchObj);
        this.componentValid();
    };
    // search component validation
    YoSearchComponent.prototype.componentValid = function () {
        if (!this.searchObj ||
            this.searchObj.length === 0 ||
            this.searchObjDuplicate(this.searchObj) === false ||
            this.searchObjValid() === false) {
            this.formIsShow = false;
        }
    };
    // searchObj check duplicate
    YoSearchComponent.prototype.searchObjDuplicate = function (_arr) {
        var result = _arr.some(function (pItem) {
            return _arr.filter(function (cItem) { return cItem.id === pItem.id; }).length > 1;
        });
        if (result) {
            console.error('SearchObj에 중복되는 값이 있습니다.');
        }
        return !result;
    };
    // searchObj validation
    // 만약 select, radio, check타입 일때 data객체 여부
    YoSearchComponent.prototype.searchObjValid = function () {
        var validObj = this.searchObj.filter(function (item, idx, arr) {
            if ((item.type === 'select' ||
                item.type === 'radio' ||
                item.type === 'check') &&
                !item.data) {
                return item;
            }
        });
        if (validObj.length > 0) {
            console.error('select, radio, check타입은 data객체도 같이 넘겨줘야 합니다.');
            return false;
        }
        return true;
    };
    // enter search
    YoSearchComponent.prototype.enterSearch = function (event, form) {
        if (event['which'] === 13) {
            this.search(form);
        }
    };
    // form value setting
    YoSearchComponent.prototype.formSet = function (_urlParams, _searchForm) {
        if (!_urlParams || !_searchForm) {
            return;
        }
        var formObj = _searchForm.controls;
        var keys = Object.keys(_urlParams), values = Object.values(_urlParams);
        keys.forEach(function (item, idx) {
            if (formObj[item]) {
                formObj[item].setValue(decodeURI(values[idx]));
            }
        });
    };
    // form value reset
    YoSearchComponent.prototype.reset = function (form) {
        var obj = {};
        this._selRaCtrl
            .defaultValue(this.searchObj, this._selRaCtrl.reset)
            .forEach(function (item) {
            if (item.type === 'date') {
                obj[item['id'] + '_ST'] = item.value;
                obj[item['id'] + '_ED'] = item.value;
            }
            obj[item['id']] = item.value;
        });
        form.reset(obj);
        this._paramUtils.resetUrlHis();
        this.searchClick.emit(form.value);
    };
    // search
    YoSearchComponent.prototype.search = function (form) {
        var param = form.value;
        this._chkCtrl.do(this.searchObj, this.matchk, this.searchForm, this._chkCtrl.get);
        for (var key in param) {
            if (param[key] && typeof param[key] === 'object') {
                param[key] = param[key].format('YYYY-MM-DD');
            }
        }
        this._paramUtils.setUrlHis(param);
        this.searchClick.emit(param);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], YoSearchComponent.prototype, "searchObj", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], YoSearchComponent.prototype, "searchClick", void 0);
    __decorate([
        core_1.ViewChild('searchForm'),
        __metadata("design:type", forms_1.NgForm)
    ], YoSearchComponent.prototype, "searchForm", void 0);
    __decorate([
        core_1.ViewChildren(material_1.MatCheckbox),
        __metadata("design:type", core_1.QueryList)
    ], YoSearchComponent.prototype, "matchk", void 0);
    __decorate([
        core_1.ContentChild(material_1.MatCheckbox),
        __metadata("design:type", material_1.MatCheckbox)
    ], YoSearchComponent.prototype, "matchk2", void 0);
    YoSearchComponent = __decorate([
        core_1.Component({
            selector: 'yo-search',
            templateUrl: './yo-search.component.html',
            styleUrls: ['./yo-search.component.scss']
        }),
        __metadata("design:paramtypes", [param_service_1.ParamUtils,
            router_1.Router,
            core_1.ElementRef,
            CheckCtrl_1.CheckCtrl,
            DateCtrl_1.DateCtrl,
            SelRaCtrl_1.SelRaCtrl])
    ], YoSearchComponent);
    return YoSearchComponent;
}());
exports.YoSearchComponent = YoSearchComponent;
//# sourceMappingURL=yo-search.component.js.map
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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var userModel_1 = require("../model/userModel");
var yo_detail_component_1 = require("../../../core/yoComponent/yo-detail/yo-detail.component");
var sweetalert2_1 = require("sweetalert2");
var yoax_service_1 = require("../../../core/yoService/db/yoax.service");
var param_service_1 = require("../../../core/yoService/utils/params/param.service");
var commonCode_1 = require("../../../commonCode");
var UserDetailComponent = /** @class */ (function () {
    function UserDetailComponent(_ys, _pu, _ar, _location) {
        var _this = this;
        this._ys = _ys;
        this._pu = _pu;
        this._ar = _ar;
        this._location = _location;
        this.usrModel = new userModel_1.UserDetailModel();
        this.usrObj = this.usrModel.usrObj;
        this.isInsert = false;
        this.url = this._ar.snapshot.url[0].path.split('-detail')[0];
        this.name = this._pu.koreanWordLastValid(commonCode_1.CommonCode.getTitle(this.url));
        this.url = '/' + this.url + '/';
        this.num = this._ar.snapshot.params.id;
        this.isInsert = this.num ? false : true;
        this._ar.data.subscribe(function (data) {
            if (data.DetailResolve) {
                var rowData = JSON.parse(data.DetailResolve._body);
                _this.usrData = rowData;
            }
        });
    }
    UserDetailComponent.prototype.ngOnInit = function () { };
    UserDetailComponent.prototype.backToList = function () {
        this._location.back();
    };
    UserDetailComponent.prototype.getActionOption = function (_type) {
        var actionOption = {
            targetName: this.name,
            actionName: '등록',
            requestType: 'post',
            requestUrl: this.url
        };
        if (_type === 'update') {
            actionOption.actionName = '수정';
            actionOption.requestType = 'put';
            actionOption.requestUrl += this.num;
        }
        else if (_type === 'delete') {
            actionOption.actionName = '삭제';
            actionOption.requestType = 'delete';
            actionOption.requestUrl += this.num;
        }
        else if (_type === 'leave') {
            actionOption.actionName = '탈퇴';
            actionOption.requestType = 'put';
            actionOption.requestUrl += this.num;
        }
        return actionOption;
    };
    UserDetailComponent.prototype.detailDo = function (_type) {
        var actionOption = this.getActionOption(_type), params = this._ydc.detailForm.value;
        var isVaild = true;
        if (actionOption.requestType === 'post' ||
            actionOption.requestType === 'put') {
            var formArr = this._ydc.detailForm['_directives'];
            isVaild = this._pu.customFormValid(formArr);
        }
        if (!isVaild) {
            return;
        }
        this.confirm(actionOption, params);
    };
    UserDetailComponent.prototype.confirm = function (actionOption, params) {
        var _this = this;
        sweetalert2_1.default({
            title: actionOption.targetName + " " + actionOption.actionName + " \uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
            text: '',
            type: 'question',
            showCancelButton: true,
            cancelButtonText: '취소',
            showConfirmButton: true,
            confirmButtonText: "" + actionOption.actionName,
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: function () {
                _this._ys
                    .yoax(actionOption.requestUrl, actionOption.requestType, params)
                    .subscribe(function (result) {
                    return result;
                });
            }
        }).then(function (result) {
            console.log(result);
            if (result.value) {
                sweetalert2_1.default(actionOption.targetName + " " + actionOption.actionName + " \uD558\uC600\uC2B5\uB2C8\uB2E4.", '', 'success').then(function () {
                    _this.backToList();
                });
            }
            if (result.dismiss) {
                console.log('취소 클릭...');
            }
        });
    };
    __decorate([
        core_1.ViewChild(yo_detail_component_1.YoDetailComponent),
        __metadata("design:type", yo_detail_component_1.YoDetailComponent)
    ], UserDetailComponent.prototype, "_ydc", void 0);
    UserDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-user-detail',
            templateUrl: './user-detail.component.html',
            styleUrls: ['./user-detail.component.scss']
        }),
        __metadata("design:paramtypes", [yoax_service_1.YoaxService,
            param_service_1.ParamUtils,
            router_1.ActivatedRoute,
            common_1.Location])
    ], UserDetailComponent);
    return UserDetailComponent;
}());
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map
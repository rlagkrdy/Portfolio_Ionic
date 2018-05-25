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
var http_1 = require("@angular/http");
var param_service_1 = require("../utils/params/param.service");
var YoaxService = /** @class */ (function () {
    function YoaxService(_http, _param) {
        this._http = _http;
        this._param = _param;
        this.URI = 'http://localhost:8080';
        this.putContentType = 'application/json; charset=utf-8';
        this.otherContentType = 'application/x-www-form-urlencoded;charset=UTF-8';
        this.isPostPut = /post|put/;
    }
    YoaxService.prototype.yoax = function (_url, _type, _param, _demi) {
        if (!this.typeIsCorrect(_type) || !_url) {
            return;
        }
        var url = this.URI + _url;
        var option = {};
        option = this.setReqParam(option, _type, _param);
        option.headers = this.setReqContentType(_type);
        var returnPromise = this.isPostPut.test(_type)
            ? this._http[_type](url, _param, option)
            : this._http[_type](url, option);
        return returnPromise;
    };
    // Request Method Type Valid
    YoaxService.prototype.typeIsCorrect = function (_type) {
        var isType = /get|post|put|delete/;
        return isType.test(_type);
    };
    // ContentType Setting
    YoaxService.prototype.setReqContentType = function (_type) {
        var headersObj = new http_1.Headers(), contentHeader = _type === 'put' ? this.putContentType : this.otherContentType;
        headersObj.append('Content-Type', contentHeader);
        return headersObj;
    };
    // Parameter Setting
    YoaxService.prototype.setReqParam = function (option, _type, _param) {
        if (_param) {
            var param = Object.assign({}, _param);
            if (param.KEYWORD) {
                param.KEYWORD = decodeURI(param.KEYWORD);
            }
            option.params = param;
            option.body = param;
        }
        return option;
    };
    // Handle Error
    YoaxService.prototype.handleError = function (error) {
        console.log('서버 에러 발생!');
        return null;
    };
    YoaxService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, param_service_1.ParamUtils])
    ], YoaxService);
    return YoaxService;
}());
exports.YoaxService = YoaxService;
//# sourceMappingURL=yoax.service.js.map
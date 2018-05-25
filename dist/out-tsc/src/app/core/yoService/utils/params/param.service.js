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
var sweetalert2_1 = require("sweetalert2");
var regex_service_1 = require("../regex/regex.service");
var ParamUtils = /** @class */ (function () {
    function ParamUtils(ru) {
        this.ru = ru;
    }
    // url string param convert to json object
    ParamUtils.prototype.urlStrParseToObj = function (queryString) {
        if (!queryString) {
            return;
        }
        var pairs = (queryString[0] === '?'
            ? queryString.substr(1)
            : queryString).split('&');
        return pairs.reduce(this.convertJson, {});
    };
    // convert to json object
    ParamUtils.prototype.convertJson = function (accumulator, item) {
        var keyValue = item.split('=');
        accumulator[keyValue[0]] = keyValue[1];
        return accumulator;
    };
    // json object convert to url string param
    ParamUtils.prototype.objConvertToUrlStr = function (queryObj) {
        var str = '?';
        str += this.queryObjConvertString(queryObj, '=', '&');
        return str;
    };
    // json object convert to location search string
    ParamUtils.prototype.objConvertToSearch = function (queryObj) {
        var str = this.queryObjConvertString(queryObj, '=', '&');
        return str;
    };
    ParamUtils.prototype.queryObjConvertString = function (queryObj, joinDemi1, joinDemi2) {
        if (joinDemi1 === void 0) { joinDemi1 = ''; }
        if (joinDemi2 === void 0) { joinDemi2 = ''; }
        return Object.keys(queryObj)
            .map(function (prop) {
            return [prop, queryObj[prop]]
                .map(encodeURIComponent)
                .join(joinDemi1);
        })
            .join(joinDemi2);
    };
    // angular form Filter
    ParamUtils.prototype.formFilter = function (_forms, _filter) {
        var idObj = _forms['_directives'].filter(function (obj) {
            if ('name' in obj && obj['name'] === _filter) {
                return true;
            }
            else {
                return false;
            }
        }), isValid = this.customFormValid(idObj);
        return isValid;
    };
    // custom form 유효성 검사
    ParamUtils.prototype.customFormValid = function (formArr) {
        var result = !formArr.some(function (item) { return item.errors !== null; });
        if (result) {
            return true;
        }
        var firstFilter = formArr
            .filter(function (item) { return item.errors !== null; })
            .reduce(this.makeTargetOption.bind(this), [])
            .some(this.formSwal);
        return result;
    };
    ParamUtils.prototype.makeTargetOption = function (preItem, currItem) {
        var targetEle = document.querySelector('#' + currItem.name);
        var option = {
            errorOption: currItem.errors,
            targetEle: targetEle,
            patternName: targetEle.getAttribute('data-patterns'),
            targetName: this.koreanWordLastValid(targetEle.getAttribute('data-target')),
            actionName: targetEle.tagName !== 'INPUT' ? '선택' : '입력'
        };
        preItem.push(option);
        return preItem;
    };
    ParamUtils.prototype.formSwal = function (item) {
        var _this = this;
        Object.keys(item.errorOption).forEach(function (key) {
            var msg;
            if (key === 'required') {
                msg = item.targetName + " " + item.actionName + "\uD574\uC8FC\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4";
            }
            if (key === 'pattern') {
                msg = item.targetName + " \uD615\uC2DD\uC758 \uB9DE\uAC8C " + item.actionName + "\uD574\uC8FC\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4";
                if (item.patternName) {
                    msg = _this.ru.getErrMsg(item.patternName);
                }
            }
            sweetalert2_1.default('', msg, 'error').then(function () {
                item.targetEle.focus();
            });
        });
    };
    // url Parameter Setting 및 location reloadState 처리
    ParamUtils.prototype.setUrlHis = function (paramObj) {
        var changeUrl = window.location.pathname, currentParam = this.urlStrParseToObj(window.location.search);
        for (var _i = 0, _a = Object.keys(paramObj); _i < _a.length; _i++) {
            var key = _a[_i];
            if (!currentParam) {
                currentParam = {};
            }
            if (paramObj[key] === 'null') {
                paramObj[key] = '';
            }
            currentParam[key] = paramObj[key];
        }
        var urlParams = this.objConvertToUrlStr(currentParam);
        changeUrl += urlParams;
        var obj = { Title: '', ChangeUrl: changeUrl };
        var parseQuery = this.urlStrParseToObj(window.location.search);
        window.history.replaceState(null, obj.Title.toString(), obj.ChangeUrl);
    };
    // url Parameter 초기화
    ParamUtils.prototype.resetUrlHis = function () {
        var changeUrl = window.location.pathname;
        window.history.replaceState(null, '', changeUrl);
    };
    // 한국어 단어 을를 구분
    ParamUtils.prototype.koreanWordLastValid = function (_word) {
        var word = _word;
        var lastChar = word.charCodeAt(word.length - 1), seletedValue = (lastChar - 0xac00) % 28 > 0 ? '을' : '를';
        word += seletedValue;
        return word;
    };
    // 첫 번째 단어가 null 이면 두번째 단어를 리턴
    ParamUtils.prototype.strIfNull = function (_str, _text) {
        var ct = _text ? _text : '';
        return _str ? _str : '' + ct + '';
    };
    ParamUtils.prototype.moneyFommat = function (_money) {
        if (_money !== null || _money !== '') {
            return (_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원');
        }
        else {
            return '0원';
        }
    };
    ParamUtils = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [regex_service_1.RegexUtils])
    ], ParamUtils);
    return ParamUtils;
}());
exports.ParamUtils = ParamUtils;
//# sourceMappingURL=param.service.js.map
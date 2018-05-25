"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var yoax_service_1 = require("./yoax.service");
var param_service_1 = require("../utils/params/param.service");
var http_1 = require("@angular/http");
var regex_service_1 = require("../utils/regex/regex.service");
describe('YoaxService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [yoax_service_1.YoaxService, param_service_1.ParamUtils, regex_service_1.RegexUtils]
        });
    });
    it('typeIsCorrect() :: type이면 true 아니면 false', testing_1.inject([yoax_service_1.YoaxService, param_service_1.ParamUtils, regex_service_1.RegexUtils], function (yoax, param, regex) {
        var result = yoax.typeIsCorrect('get');
        expect(result).toBeTruthy();
        result = yoax.typeIsCorrect('GET');
        expect(result).toBeFalsy();
    }));
    it('setReqContentType() :: Content-Type을 가지고있는 Headers객체를 return 받고 put일때와 아닐 때로 나뉜다.', testing_1.inject([yoax_service_1.YoaxService, param_service_1.ParamUtils, regex_service_1.RegexUtils], function (yoax, param, regex) {
        var result = yoax.setReqContentType('put');
        expect(result.has('content-type')).toBeTruthy();
        expect(result.get('Content-Type')).toBe('application/json; charset=utf-8');
        result = yoax.setReqContentType('get');
        expect(result.get('Content-Type')).toBe('application/x-www-form-urlencoded;charset=UTF-8');
    }));
    it('setReqParam() :: RequestOptionsArgs객체를 return 받고 get일 때는 search에 아닐때는 params, body에 파마미터를 담는다.', testing_1.inject([yoax_service_1.YoaxService, param_service_1.ParamUtils, regex_service_1.RegexUtils], function (yoax, param, regex) {
        var option = {};
        var params = {
            USR_NAME: '김학요',
            USR_PHONE: '01058701111'
        };
        option = yoax.setReqParam(option, 'post', params);
        expect(option.params).toBe(params);
        expect(option.body).toBe(params);
    }));
    it('yoax() :: Observable객체를 return 받는다', testing_1.async(testing_1.inject([yoax_service_1.YoaxService, param_service_1.ParamUtils, regex_service_1.RegexUtils], function (yoax, param, regex) {
        var params = {
            USR_NAME: '김학요1',
            USR_PHONE: '01058701111'
        };
        yoax.yoax('/usr/', 'get', params).subscribe(function (result) {
            expect(result.ok).toBeTruthy();
        }, function (error) {
            expect(error.ok).toBeFalsy();
        });
    })));
});
//# sourceMappingURL=yoax.service.spec.js.map
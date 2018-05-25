"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var param_service_1 = require("./param.service");
describe('ParamService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [param_service_1.ParamUtils]
        });
    });
    it('should be created', testing_1.inject([param_service_1.ParamUtils], function (service) {
        expect(service).toBeTruthy();
    }));
    it('urlStrParseToObj() :: url string param convert to json object', testing_1.inject([param_service_1.ParamUtils], function (service) {
        var data = service.urlStrParseToObj('?aaa=bbb&ccc=ddd');
        expect(data.aaa).toBe('bbb');
        expect(data.ccc).toBe('ddd');
    }));
    it('objConvertToUrlStr() :: json object convert to url string param', testing_1.inject([param_service_1.ParamUtils], function (service) {
        var jsonObj = {
            aaa: 'bbb',
            ccc: 'ddd'
        };
        var data = service.objConvertToUrlStr(jsonObj);
        expect(data).toBe('?aaa=bbb&ccc=ddd');
    }));
    it('objConvertToSearch () :: json object convert to location search string', testing_1.inject([param_service_1.ParamUtils], function (service) {
        var jsonObj = {
            aaa: 'bbb',
            ccc: 'ddd'
        };
        var data = service.objConvertToSearch(jsonObj);
        expect(data).toBe('aaa=bbb&ccc=ddd');
    }));
    it('koreanWordLastValid() :: 한국어 단어 을 or 를 구분하여 추가', testing_1.inject([param_service_1.ParamUtils], function (service) {
        var data = '사과';
        data = service.koreanWordLastValid(data);
        expect(data).toBe('사과를');
        data = '행복';
        data = service.koreanWordLastValid(data);
        expect(data).toBe('행복을');
    }));
    it('strIfNull() :: 첫 번째 단어가 null 이면 두번째 단어를 리턴, 아니면 첫번째 리턴', testing_1.inject([param_service_1.ParamUtils], function (service) {
        var data = null;
        var data2 = null;
        data = service.strIfNull(data, data2);
        expect(data).toBe('');
        data = '김';
        data2 = '학요';
        data = service.strIfNull(data, data2);
        expect(data).toBe('김');
        data = null;
        data2 = '학요';
        data = service.strIfNull(data, data2);
        expect(data).toBe('학요');
    }));
    it('moneyFommat() :: 30000은 30,000원을 리턴', testing_1.inject([param_service_1.ParamUtils], function (service) {
        var data = 30000;
        data = service.moneyFommat(data);
        expect(data).toBe('30,000원');
    }));
    it('resetUrlHis() :: url param string이 초기화 됨', testing_1.inject([param_service_1.ParamUtils], function (service) {
        service.resetUrlHis();
    }));
});
//# sourceMappingURL=param.service.spec.js.map
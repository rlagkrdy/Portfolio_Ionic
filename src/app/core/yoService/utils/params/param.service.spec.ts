import { TestBed, inject } from '@angular/core/testing';

import { ParamUtils } from './param.service';
import { CheckboxSelectionComponent } from 'ag-grid';

describe('ParamService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ParamUtils]
        });
    });

    it(
        'should be created',
        inject([ParamUtils], (service: ParamUtils) => {
            expect(service).toBeTruthy();
        })
    );

    it(
        'urlStrParseToObj() :: url string param convert to json object',
        inject([ParamUtils], (service: ParamUtils) => {
            const data = service.urlStrParseToObj('?aaa=bbb&ccc=ddd');
            expect(data.aaa).toBe('bbb');
            expect(data.ccc).toBe('ddd');
        })
    );

    it(
        'objConvertToUrlStr() :: json object convert to url string param',
        inject([ParamUtils], (service: ParamUtils) => {
            const jsonObj = {
                aaa: 'bbb',
                ccc: 'ddd'
            };
            const data = service.objConvertToUrlStr(jsonObj);
            expect(data).toBe('?aaa=bbb&ccc=ddd');
        })
    );

    it(
        'objConvertToSearch () :: json object convert to location search string',
        inject([ParamUtils], (service: ParamUtils) => {
            const jsonObj = {
                aaa: 'bbb',
                ccc: 'ddd'
            };
            const data = service.objConvertToSearch(jsonObj);
            expect(data).toBe('aaa=bbb&ccc=ddd');
        })
    );

    it(
        'koreanWordLastValid() :: 한국어 단어 을 or 를 구분하여 추가',
        inject([ParamUtils], (service: ParamUtils) => {
            let data = '사과';
            data = service.koreanWordLastValid(data);
            expect(data).toBe('사과를');
            data = '행복';
            data = service.koreanWordLastValid(data);
            expect(data).toBe('행복을');
        })
    );

    it(
        'strIfNull() :: 첫 번째 단어가 null 이면 두번째 단어를 리턴, 아니면 첫번째 리턴',
        inject([ParamUtils], (service: ParamUtils) => {
            let data = null;
            let data2 = null;
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
        })
    );

    it(
        'resetUrlHis() :: url param string이 초기화 됨',
        inject([ParamUtils], (service: ParamUtils) => {
            service.resetUrlHis();
        })
    );
});

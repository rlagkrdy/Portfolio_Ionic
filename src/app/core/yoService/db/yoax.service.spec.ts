import { TestBed, inject, async } from '@angular/core/testing';
import { YoaxService } from './yoax.service';
import { ParamUtils } from '../utils/params/param.service';
import { Http, HttpModule, Headers, RequestOptionsArgs } from '@angular/http';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RegexUtils } from '../utils/regex/regex.service';

describe('YoaxService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [YoaxService, ParamUtils, RegexUtils]
        });
    });

    it(
        'typeIsCorrect() :: type이면 true 아니면 false',
        inject(
            [YoaxService, ParamUtils, RegexUtils],
            (yoax: YoaxService, param: ParamUtils, regex: RegexUtils) => {
                let result: boolean = yoax.typeIsCorrect('get');
                expect(result).toBeTruthy();
                result = yoax.typeIsCorrect('GET');
                expect(result).toBeFalsy();
            }
        )
    );

    it(
        'setReqContentType() :: Content-Type을 가지고있는 Headers객체를 return 받고 put일때와 아닐 때로 나뉜다.',
        inject(
            [YoaxService, ParamUtils, RegexUtils],
            (yoax: YoaxService, param: ParamUtils, regex: RegexUtils) => {
                let result: Headers = yoax.setReqContentType('put');
                expect(result.has('content-type')).toBeTruthy();
                expect(result.get('Content-Type')).toBe(
                    'application/json; charset=utf-8'
                );
                result = yoax.setReqContentType('get');
                expect(result.get('Content-Type')).toBe(
                    'application/x-www-form-urlencoded;charset=UTF-8'
                );
            }
        )
    );

    it(
        'setReqParam() :: RequestOptionsArgs객체를 return 받고 get일 때는 search에 아닐때는 params, body에 파마미터를 담는다.',
        inject(
            [YoaxService, ParamUtils, RegexUtils],
            (yoax: YoaxService, param: ParamUtils, regex: RegexUtils) => {
                let option: RequestOptionsArgs = {};
                const params: any = {
                    USR_NAME: '김학요',
                    USR_PHONE: '01058701111'
                };
                option = yoax.setReqParam(option, 'post', params);
                expect(option.params).toBe(params);
                expect(option.body).toBe(params);
            }
        )
    );

    it('yoax() :: Observable객체를 return 받는다', async(
        inject(
            [YoaxService, ParamUtils, RegexUtils],
            (yoax: YoaxService, param: ParamUtils, regex: RegexUtils) => {
                const params: any = {
                    USR_NAME: '김학요1',
                    USR_PHONE: '01058701111'
                };

                yoax.yoax('/usr/', 'get', params).subscribe(
                    result => {
                        expect(result.ok).toBeTruthy();
                    },
                    error => {
                        expect(error.ok).toBeFalsy();
                    }
                );
            }
        )
    ));
});

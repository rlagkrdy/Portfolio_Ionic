import { TestBed, inject } from '@angular/core/testing';

import { RegexUtils } from './regex.service';

describe('RegexService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RegexUtils]
        });
    });

    it(
        'should be created',
        inject([RegexUtils], (service: RegexUtils) => {
            expect(service).toBeTruthy();
        })
    );

    it(
        'getPattern(type) :: type이 id면 rlagkrdy는 정규식을 테스트는 return true',
        inject([RegexUtils], (service: RegexUtils) => {
            const result: RegExp = service.getPattern('id');
            expect('rlagkrdy').toMatch(result);
        })
    );

    it(
        'getPattern(type) :: type이 id면 1rlagkrdy는 정규식을 테스트는 return false',
        inject([RegexUtils], (service: RegexUtils) => {
            const result: RegExp = service.getPattern('id');
            expect('1rlagkrdy').not.toMatch(result);
        })
    );

    it(
        'getPattern(type) :: type이 pw면 rlagkrdy는 정규식을 테스트는 return true',
        inject([RegexUtils], (service: RegexUtils) => {
            const result: RegExp = service.getPattern('pw');
            expect('rlagkrdy').toMatch(result);
        })
    );

    it(
        'getPattern(type) :: type이 id면 rlagkrdy##는 정규식을 테스트는 return false',
        inject([RegexUtils], (service: RegexUtils) => {
            const result: RegExp = service.getPattern('pw');
            expect('rlagkrdy##').not.toMatch(result);
        })
    );

    it(
        'getPattern(type) :: type이 email면 rlagkrdy@naver.com은 정규식을 테스트는 return true',
        inject([RegexUtils], (service: RegexUtils) => {
            const result: RegExp = service.getPattern('email');
            expect('rlagkrdy@naver.com').toMatch(result);
        })
    );

    it(
        'getPattern(type) :: type이 email면 rlagkrdy@naver은 테스트는 return false',
        inject([RegexUtils], (service: RegexUtils) => {
            const result: RegExp = service.getPattern('email');
            expect('rlagkrdy@naver').not.toMatch(result);
        })
    );

    it(
        'getErrMsg(type) :: type이 id면 return 아이디는 영어 소문자로 시작하는 4~20자 영어 소문자 또는 숫자이어야 합니다.',
        inject([RegexUtils], (service: RegexUtils) => {
            const result: string = service.getErrMsg('id');
            expect(result).toBe(
                '아이디는 영어 소문자로 시작하는 4~20자 영어 소문자 또는 숫자이어야 합니다.'
            );
        })
    );

    it(
        'getErrMsg(type) :: type이 pw면 return 비밀번호는 영문 소문자, 숫자혼합하여 6~18자리입니다.',
        inject([RegexUtils], (service: RegexUtils) => {
            const result: string = service.getErrMsg('pw');
            expect(result).toBe(
                '비밀번호는 영문 소문자, 숫자혼합하여 6~18자리입니다.'
            );
        })
    );

    it(
        'getErrMsg(type) :: type이 email면 return 이메일은 xxxx@xxx.xxx 형식이여 합니다.',
        inject([RegexUtils], (service: RegexUtils) => {
            const result: string = service.getErrMsg('email');
            expect(result).toBe('이메일은 xxxx@xxx.xxx 형식이여 합니다.');
        })
    );
});

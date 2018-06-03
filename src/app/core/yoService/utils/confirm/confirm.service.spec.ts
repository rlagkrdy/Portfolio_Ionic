import { TestBed, inject } from '@angular/core/testing';

import { ConfirmUtils, ActionOption } from './confirm.service';
import { YoaxService } from '../../db/yoax.service';
import { ParamUtils } from '../params/param.service';
import { HttpModule } from '@angular/http';

describe('ConfirmService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [ConfirmUtils, YoaxService, ParamUtils]
        });
    });

    it(
        'should be created',
        inject([ConfirmUtils], (service: ConfirmUtils) => {
            expect(service).toBeTruthy();
        })
    );

    it(
        'getActionOption() :: _type이 틀리면 null 이여야 한다.',
        inject([ConfirmUtils], (service: ConfirmUtils) => {
            const result: ActionOption = service.getActionOption(
                '/usr/',
                123,
                'post'
            );
            expect(result).toBe(null);
        })
    );

    it(
        'getActionOption() :: _type이 insert이면 actionName은 등록, requestType은 post/' +
            'update이면 actionName은 등록, requestType은 put/' +
            'delete이면 actionName은 등록, requestType은 delete/' +
            'leave이면 actionName은 등록, requestType은 put/' +
            'restore이면 actionName은 등록, requestType은 put/',
        inject([ConfirmUtils], (service: ConfirmUtils) => {
            let result: ActionOption;
            result = service.getActionOption('/usr/', 123, 'insert');
            expect(result.actionName).toBe('등록');
            expect(result.requestType).toBe('post');

            result = service.getActionOption('/usr/', 123, 'update');
            expect(result.actionName).toBe('수정');
            expect(result.requestType).toBe('put');

            result = service.getActionOption('/usr/', 123, 'delete');
            expect(result.actionName).toBe('삭제');
            expect(result.requestType).toBe('delete');

            result = service.getActionOption('/usr/', 123, 'leave');
            expect(result.actionName).toBe('탈퇴');
            expect(result.requestType).toBe('put');

            result = service.getActionOption('/usr/', 123, 'restore');
            expect(result.actionName).toBe('복원');
            expect(result.requestType).toBe('put');
        })
    );

    it(
        'getActionOption() :: url이 /usr/이면 targetName은 회원을 이여야 한다',
        inject([ConfirmUtils], (service: ConfirmUtils) => {
            let result: ActionOption;
            result = service.getActionOption('/usr/', 123, 'insert');
            expect(result.targetName).toBe('회원을');
        })
    );

    it(
        'getActionOption() :: type이 insert이면 requestUrl===url, 아니면 requestUrl===url+num',
        inject([ConfirmUtils], (service: ConfirmUtils) => {
            let result: ActionOption;
            result = service.getActionOption('/usr/', 123, 'insert');
            expect(result.requestUrl).toBe('/usr/');

            result = service.getActionOption('/usr/', 123, 'update');
            expect(result.requestUrl).toBe('/usr/123');

            result = service.getActionOption('/usr/', 123, 'delete');
            expect(result.requestUrl).toBe('/usr/123');

            result = service.getActionOption('/usr/', 123, 'leave');
            expect(result.requestUrl).toBe('/usr/123');

            result = service.getActionOption('/usr/', 123, 'restore');
            expect(result.requestUrl).toBe('/usr/123');
        })
    );
});

import { TestBed, inject } from '@angular/core/testing';

import { FormatterUtils } from './formatter.service';

describe('FormatterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FormatterUtils]
        });
    });

    it(
        'should be created',
        inject([FormatterUtils], (service: FormatterUtils) => {
            expect(service).toBeTruthy();
        })
    );

    it(
        'moneyFommat() :: 30000은 30,000원을 리턴',
        inject([FormatterUtils], (service: FormatterUtils) => {
            let data: string | number = 30000;
            data = service.moneyFommat(data);
            expect(data).toBe('30,000원');
        })
    );
});

import { TestBed, inject } from '@angular/core/testing';

import { DateUtils } from './date.service';

describe('DateService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DateUtils]
        });
    });

    it(
        'should be created',
        inject([DateUtils], (service: DateUtils) => {
            expect(service).toBeTruthy();
        })
    );
});

import { TestBed, inject } from '@angular/core/testing';

import { ConfirmUtils } from './confirm.service';

describe('ConfirmService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConfirmUtils]
        });
    });

    it(
        'should be created',
        inject([ConfirmUtils], (service: ConfirmUtils) => {
            expect(service).toBeTruthy();
        })
    );
});

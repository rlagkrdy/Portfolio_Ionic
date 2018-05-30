import { TestBed, inject } from '@angular/core/testing';

import { FormUtils } from './form.service';

describe('FormService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FormUtils]
        });
    });

    it(
        'should be created',
        inject([FormUtils], (service: FormUtils) => {
            expect(service).toBeTruthy();
        })
    );
});

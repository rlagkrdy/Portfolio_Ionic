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
});

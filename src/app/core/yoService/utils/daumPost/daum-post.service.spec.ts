import { TestBed, inject } from '@angular/core/testing';

import { DaumPostService } from './daum-post.service';

describe('DaumPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaumPostService]
    });
  });

  it('should be created', inject([DaumPostService], (service: DaumPostService) => {
    expect(service).toBeTruthy();
  }));
});

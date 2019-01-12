import { TestBed, inject } from '@angular/core/testing';

import { TreatsService } from './treats.service';

describe('TreatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreatsService]
    });
  });

  it('should be created', inject([TreatsService], (service: TreatsService) => {
    expect(service).toBeTruthy();
  }));
});

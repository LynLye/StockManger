import { TestBed, inject } from '@angular/core/testing';

import { MultipleService } from './multiple.service';

describe('MultipleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultipleService]
    });
  });

  it('should be created', inject([MultipleService], (service: MultipleService) => {
    expect(service).toBeTruthy();
  }));
});

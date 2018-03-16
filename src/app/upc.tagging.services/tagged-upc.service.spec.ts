import { TestBed, inject } from '@angular/core/testing';

import { TaggedUpcService } from './tagged-upc.service';

describe('TaggedUpcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaggedUpcService]
    });
  });

  it('should be created', inject([TaggedUpcService], (service: TaggedUpcService) => {
    expect(service).toBeTruthy();
  }));
});

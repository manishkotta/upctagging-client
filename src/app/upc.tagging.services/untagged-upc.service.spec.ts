import { TestBed, inject } from '@angular/core/testing';

import { UntaggedUpcService } from './untagged-upc.service';

describe('UntaggedUpcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UntaggedUpcService]
    });
  });

  it('should be created', inject([UntaggedUpcService], (service: UntaggedUpcService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { StubServiceService } from './stub-service.service';

describe('StubServiceService', () => {
  let service: StubServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StubServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

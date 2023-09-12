import { TestBed } from '@angular/core/testing';

import { RttServiceService } from './rtt-service.service';

describe('RttServiceService', () => {
  let service: RttServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RttServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

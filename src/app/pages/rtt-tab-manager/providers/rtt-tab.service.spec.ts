import { TestBed } from '@angular/core/testing';

import { RttTabService } from './rtt-tab.service';

describe('RttTabService', () => {
  let service: RttTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RttTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

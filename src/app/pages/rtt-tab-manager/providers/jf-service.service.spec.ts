import { TestBed } from '@angular/core/testing';

import { JfServiceService } from './jf-service.service';

describe('JfServiceService', () => {
  let service: JfServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JfServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

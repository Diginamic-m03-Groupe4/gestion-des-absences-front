import { TestBed } from '@angular/core/testing';

import { AbsenceUtilTabService } from './absence-util-tab.service';

describe('AbsenceUtilTabService', () => {
  let service: AbsenceUtilTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenceUtilTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

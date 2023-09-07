import { TestBed } from '@angular/core/testing';

import { AbsenceManagerService } from './absence-manager.service';

describe('AbsenceManagerService', () => {
  let service: AbsenceManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenceManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

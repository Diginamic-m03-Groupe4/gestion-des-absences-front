import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionAbsenceComponent } from './suppression.absence.component';

describe('SuppressionAbsenceComponent', () => {
  let component: SuppressionAbsenceComponent;
  let fixture: ComponentFixture<SuppressionAbsenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppressionAbsenceComponent]
    });
    fixture = TestBed.createComponent(SuppressionAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

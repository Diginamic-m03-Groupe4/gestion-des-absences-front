import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampsAbsenceComponent } from './champs.absence.component';

describe('ChampsAbsenceComponent', () => {
  let component: ChampsAbsenceComponent;
  let fixture: ComponentFixture<ChampsAbsenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChampsAbsenceComponent]
    });
    fixture = TestBed.createComponent(ChampsAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

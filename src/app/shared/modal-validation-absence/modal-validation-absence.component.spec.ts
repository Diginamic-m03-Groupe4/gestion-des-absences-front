import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidationAbsenceComponent } from './modal-validation-absence.component';

describe('ModalValidationAbsenceComponent', () => {
  let component: ModalValidationAbsenceComponent;
  let fixture: ComponentFixture<ModalValidationAbsenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalValidationAbsenceComponent]
    });
    fixture = TestBed.createComponent(ModalValidationAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

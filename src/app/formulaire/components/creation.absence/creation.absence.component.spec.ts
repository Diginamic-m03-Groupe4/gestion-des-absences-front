import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationAbsenceComponent } from './creation.absence.component';

describe('CreationAbsenceComponent', () => {
  let component: CreationAbsenceComponent;
  let fixture: ComponentFixture<CreationAbsenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationAbsenceComponent]
    });
    fixture = TestBed.createComponent(CreationAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

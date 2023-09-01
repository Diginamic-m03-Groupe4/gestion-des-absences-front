import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationAbsenceComponent } from './modification.absence.component';

describe('ModificationAbsenceComponent', () => {
  let component: ModificationAbsenceComponent;
  let fixture: ComponentFixture<ModificationAbsenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationAbsenceComponent]
    });
    fixture = TestBed.createComponent(ModificationAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

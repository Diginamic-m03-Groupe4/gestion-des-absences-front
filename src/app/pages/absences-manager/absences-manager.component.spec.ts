import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencesManagerComponent } from './absences-manager.component';

describe('AbsencesManagerComponent', () => {
  let component: AbsencesManagerComponent;
  let fixture: ComponentFixture<AbsencesManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsencesManagerComponent]
    });
    fixture = TestBed.createComponent(AbsencesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

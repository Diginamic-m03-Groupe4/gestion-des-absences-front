import { ComponentFixture, TestBed } from '@angular/core/testing';

import AbsenceTabUtilisateurComponent from './absence-tab-utilisateur.component';

describe('AbsenceTabUtilisateurComponent', () => {
  let component: AbsenceTabUtilisateurComponent;
  let fixture: ComponentFixture<AbsenceTabUtilisateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceTabUtilisateurComponent]
    });
    fixture = TestBed.createComponent(AbsenceTabUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreationRttComponent } from './modal-creation-rtt.component';

describe('ModalCreationRttComponent', () => {
  let component: ModalCreationRttComponent;
  let fixture: ComponentFixture<ModalCreationRttComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreationRttComponent]
    });
    fixture = TestBed.createComponent(ModalCreationRttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

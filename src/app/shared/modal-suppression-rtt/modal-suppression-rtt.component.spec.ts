import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuppressionRttComponent } from './modal-suppression-rtt.component';

describe('ModalSuppressionRttComponent', () => {
  let component: ModalSuppressionRttComponent;
  let fixture: ComponentFixture<ModalSuppressionRttComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSuppressionRttComponent]
    });
    fixture = TestBed.createComponent(ModalSuppressionRttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

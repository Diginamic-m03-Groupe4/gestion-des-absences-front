import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModifRTTComponent } from './modal-modif-rtt.component';

describe('ModalModifRTTComponent', () => {
  let component: ModalModifRTTComponent;
  let fixture: ComponentFixture<ModalModifRTTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalModifRTTComponent]
    });
    fixture = TestBed.createComponent(ModalModifRTTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

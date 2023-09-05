import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModifJFComponent } from './modal-modif-jf.component';

describe('ModalModifJFComponent', () => {
  let component: ModalModifJFComponent;
  let fixture: ComponentFixture<ModalModifJFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalModifJFComponent]
    });
    fixture = TestBed.createComponent(ModalModifJFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

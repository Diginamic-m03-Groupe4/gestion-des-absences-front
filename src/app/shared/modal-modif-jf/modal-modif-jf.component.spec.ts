import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModifJfComponent } from './modal-modif-jf.component';

describe('ModalModifJfComponent', () => {
  let component: ModalModifJfComponent;
  let fixture: ComponentFixture<ModalModifJfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalModifJfComponent]
    });
    fixture = TestBed.createComponent(ModalModifJfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

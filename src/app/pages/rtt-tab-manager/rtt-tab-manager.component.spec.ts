import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RttTabManagerComponent } from './rtt-tab-manager.component';

describe('RttTabManagerComponent', () => {
  let component: RttTabManagerComponent;
  let fixture: ComponentFixture<RttTabManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RttTabManagerComponent]
    });
    fixture = TestBed.createComponent(RttTabManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerFormComponent } from './passenger-form.component';

describe('PassengerFormComponent', () => {
  let component: PassengerFormComponent;
  let fixture: ComponentFixture<PassengerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassengerFormComponent]
    });
    fixture = TestBed.createComponent(PassengerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

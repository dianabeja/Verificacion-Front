import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelodetallesComponent } from './vuelodetalles.component';

describe('VuelodetallesComponent', () => {
  let component: VuelodetallesComponent;
  let fixture: ComponentFixture<VuelodetallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VuelodetallesComponent]
    });
    fixture = TestBed.createComponent(VuelodetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevacontrasenaComponent } from './nuevacontrasena.component';

describe('NuevacontrasenaComponent', () => {
  let component: NuevacontrasenaComponent;
  let fixture: ComponentFixture<NuevacontrasenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevacontrasenaComponent]
    });
    fixture = TestBed.createComponent(NuevacontrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoverificacionComponent } from './codigoverificacion.component';

describe('CodigoverificacionComponent', () => {
  let component: CodigoverificacionComponent;
  let fixture: ComponentFixture<CodigoverificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodigoverificacionComponent]
    });
    fixture = TestBed.createComponent(CodigoverificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteDetalleComponent } from './componente-detalle.component';

describe('ComponenteDetalleComponent', () => {
  let component: ComponenteDetalleComponent;
  let fixture: ComponentFixture<ComponenteDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

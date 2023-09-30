import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteListadoComponent } from './componente-listado.component';

describe('ComponenteListadoComponent', () => {
  let component: ComponenteListadoComponent;
  let fixture: ComponentFixture<ComponenteListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

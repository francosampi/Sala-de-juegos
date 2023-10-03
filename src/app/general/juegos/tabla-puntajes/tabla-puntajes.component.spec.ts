import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPuntajesComponent } from './tabla-puntajes.component';

describe('TablaPuntajesComponent', () => {
  let component: TablaPuntajesComponent;
  let fixture: ComponentFixture<TablaPuntajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPuntajesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaPuntajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

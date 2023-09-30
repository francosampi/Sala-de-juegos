import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteAltaComponent } from './componente-alta.component';

describe('ComponenteAltaComponent', () => {
  let component: ComponenteAltaComponent;
  let fixture: ComponentFixture<ComponenteAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

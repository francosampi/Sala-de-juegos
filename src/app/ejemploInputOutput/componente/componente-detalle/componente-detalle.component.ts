import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-componente-detalle',
  templateUrl: './componente-detalle.component.html',
  styleUrls: ['./componente-detalle.component.css']
})
export class ComponenteDetalleComponent {
  @Input() producto? : any;

}

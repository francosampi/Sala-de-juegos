import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-componente-listado',
  templateUrl: './componente-listado.component.html',
  styleUrls: ['./componente-listado.component.css']
})
export class ComponenteListadoComponent {
  @Input() listaRecibidaProductos? : any[];
  @Output() eventoMostramosDetalle : EventEmitter<any> = new EventEmitter<any>();

  mostrarDetalle(producto : any) {
    this.eventoMostramosDetalle.emit(producto);
    console.info("producto ",producto);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-componente-alta',
  templateUrl: './componente-alta.component.html',
  styleUrls: ['./componente-alta.component.css']
})
export class ComponenteAltaComponent {
  @Output() eventoCreamosProducto : EventEmitter<any> = new EventEmitter<any>();

  marca = "";
  stock = 0;
  precio = 0;

  guardar() {
    let producto: any = [];
    producto.marca = this.marca;
    producto.stock = this.stock;
    producto.precio = this.precio;
    console.log(producto);
    //aca debemos avisar que creamos un objeto y enviarlo como parametro
    this.eventoCreamosProducto.emit(producto);
  }
}

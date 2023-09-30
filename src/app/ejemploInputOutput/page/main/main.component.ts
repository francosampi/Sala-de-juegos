import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  listaProductos : any[];

  marca = "";
  stock = 0;
  precio = 0;
  productoADetallar: any;

  constructor() {
    this.listaProductos=[
      {precio: 200, marca: "AAA", stock: 5},
      {precio: 250, marca: "BBB", stock: 4},
      {precio: 300, marca: "CCC", stock: 3},
    ];
  }

    guardar($event : any)
    {
      this.listaProductos.push($event);
    }

    detalle($event : any)
    {
      this.productoADetallar = $event;
    }
}

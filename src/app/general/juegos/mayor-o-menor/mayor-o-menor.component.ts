import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrls: ['./mayor-o-menor.component.css', '../juegos-btn-empezar.css']
})
export class MayorOMenorComponent implements OnInit{
  juegoIniciado: boolean = false;
  numeroActual: number = 0;
  intentos: number = 0;
  resultadoCorrecto: boolean = false;
  resultado: string = '';
  racha: number = 0;
  primerCarta: boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  iniciarJuego() {
    this.juegoIniciado=true;
    this.numeroActual = this.darCartaRandom();
    this.intentos = 0;
    this.resultado = '';
    this.racha = 0;
  }

  darCartaRandom(){
    let nuevoNumero: number;
    
    do{
      nuevoNumero=Math.floor(Math.random() * 10) + 1;
    }
    while(nuevoNumero===this.numeroActual);

    return nuevoNumero;
  }

  getImagenCarta(numero: number): string {
    return `"../../../../../assets/juegos/mayor-o-menor/cartas_rojas/Clovers_${numero}_white.png`;
  }

  resultadoFueCorrecto(){
    this.resultadoCorrecto=true;
    this.racha++;
  }
  
  resultadoFueIncorrecto(){
    this.resultadoCorrecto=false;
    this.racha=0;
  }

  adivinarMayor() {
    const nuevoNumero = this.darCartaRandom();
    
    if (nuevoNumero > this.numeroActual) {
      this.resultadoFueCorrecto();
    } else {
      this.resultadoFueIncorrecto();
    }

    if (!this.primerCarta)
    {
      this.primerCarta=true;
    }

    this.numeroActual = nuevoNumero;
    this.intentos++;
  }

  adivinarMenor() {
    const nuevoNumero = this.darCartaRandom();

    if (nuevoNumero < this.numeroActual) {
      this.resultadoFueCorrecto();
    } else {
      this.resultadoFueIncorrecto();
    }

    if (!this.primerCarta)
    {
      this.primerCarta=true;
    }

    this.numeroActual = nuevoNumero;
    this.intentos++;
  }
}
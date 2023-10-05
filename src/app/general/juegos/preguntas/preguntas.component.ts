import { Component, OnInit } from '@angular/core';
import { PREGUNTAS } from './preguntas-listado'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css', '../juegos-btn-empezar.css']
})
export class PreguntasComponent implements OnInit {
  juegoIniciado: boolean = false;
  jugadorPos: number = 0;
  tablero: string[] = ['entrada'];
  categorias = Object.keys(PREGUNTAS);
  categoriaActual: string = '';
  preguntaMostrada: any = null;
  opciones: string[] = [];
  dadoSacado: string='';
  canGirarDado: boolean=true;
  puntaje: number = 0;
  mostrarMsjCorrecto: boolean=false;
  cantidadCasillas = 28;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  iniciarJuego(){
    this.juegoIniciado=true;
    this.jugadorPos=0;
    this.tablero=[];
    this.categoriaActual='';
    this.preguntaMostrada=null;
    this.dadoSacado='';
    this.canGirarDado=true;
    this.puntaje=0;
    this.mostrarMsjCorrecto=false;
    this.generarTablero();
  }

  generarColorAleatorio(): string {
    const colores = ['amarillo', 'rojo', 'verde', 'azul'];
    const indice = Math.floor(Math.random() * colores.length);
    return colores[indice];
  }

  generarTablero(): void {
    for (let i = 0; i < this.cantidadCasillas; i++) {
      const color = this.generarColorAleatorio();
      this.tablero.push(color);
    }
    this.tablero.push('llegada');
  }

  girarDado() {
    this.canGirarDado=false;

    const dadoSalido = Math.floor(Math.random() * 6)+1;
    this.avanzarPosicion(dadoSalido);
    this.dadoSacado=dadoSalido.toString();

    const colorCategoria = this.tablero[this.jugadorPos];

    switch (colorCategoria) {
      case 'rojo':
        this.categoriaActual = 'videojuegos';
        break;
      case 'amarillo':
        this.categoriaActual = 'ciencia';
        break;
      case 'verde':
        this.categoriaActual = 'cine';
        break;
      case 'azul':
        this.categoriaActual = 'historia';
        break;
    }

    setTimeout(() => {
      this.dadoSacado='';
      this.mostrarSiguientePregunta();
    }, 2150);
  }

  avanzarPosicion(_cantidad: number) {
    this.jugadorPos += _cantidad;

    if (this.jugadorPos > this.tablero.length - 1) {
      Swal.fire({
        icon: 'success',
        title: '¡Felicidades!',
        html: 'Llegaste al final del recorrido...<br>¡Tu puntaje es de <b>'+this.puntaje+'</b>!',
      });
    }
  }

  mostrarSiguientePregunta() {
    if (this.categoriaActual) {
      const preguntasCategoria = PREGUNTAS[this.categoriaActual];

      if (preguntasCategoria && preguntasCategoria.length > 0) {
        const indiceAleatorio = Math.floor(
          Math.random() * preguntasCategoria.length
        );
        this.preguntaMostrada = preguntasCategoria[indiceAleatorio];
        this.opciones = this.shuffleOptions(this.preguntaMostrada.opciones);
      }
    }
  }

  verificarRespuesta(respuesta: string) {
    if (respuesta === this.preguntaMostrada.respuestaCorrecta) {
      this.puntaje++;
      this.categoriaActual='';
      this.mostrarMsjCorrecto=true;
      this.preguntaMostrada=null;

      setTimeout(() => {
        this.mostrarMsjCorrecto=false;
        this.canGirarDado=true;
      }, 2150);
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: '¡Ups!',
        html:
        'La respuesta era <b>'+this.preguntaMostrada.respuestaCorrecta+'</b>...',
        showDenyButton: true,
        confirmButtonText: '¡Otra partida!',
        denyButtonText: 'Ir a otros juegos'
      }).then((result) => {
        if (result.isDenied) {
          this.router.navigate(['/juegos']);
        }
      }).finally(()=>{
        this.iniciarJuego();
      });
    }
  }

  shuffleOptions(options: string[]) {

    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }
}

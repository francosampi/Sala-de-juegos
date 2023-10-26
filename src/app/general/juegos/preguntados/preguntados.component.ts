import { Component, OnDestroy, OnInit } from '@angular/core';
import { PREGUNTAS } from '../preguntas-listado'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Puntaje } from 'src/app/interfaces/puntaje';
import { ZonahorariaService } from 'src/app/services/zonahoraria/zonahoraria.service';
import { PuntajeService } from 'src/app/services/puntaje/puntaje.service';
import { ImagenesService } from 'src/app/services/imagenes/imagenes.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css', '../juegos-btn-empezar.css']
})
export class PreguntadosComponent implements OnInit, OnDestroy {
  juegoIniciado: boolean = true;
  jugadorPos: number = 0;
  categorias = Object.keys(PREGUNTAS);
  categoriaActual: string = '';
  preguntaMostrada: any = null;
  opciones: string[] = [];
  mostrarMsjCorrecto: boolean = false;
  puntajes: Puntaje[] = [];
  imagenSrc?: string;
  tiempoId: any;
  tiempo: number = -1;

  constructor(private router: Router, private authService: AuthService, private zonaHorariaService: ZonahorariaService,
    private puntajeService: PuntajeService, private imagenesService: ImagenesService) { }

  ngOnInit() {
    this.puntajeService.getPuntajesPreguntados().subscribe((listaPuntajes) => {
      this.puntajes = listaPuntajes;
      console.log(listaPuntajes);
    });

    this.iniciarJuego();
  }

  ngOnDestroy(): void {
    this.borrarIntervalo();
  }

  iniciarJuego() {
    this.configurarJuego();
    this.mostrarSiguientePregunta();
  }

  configurarJuego() {
    this.juegoIniciado = true;
    this.jugadorPos = 0;
    this.elegirCategoria();
    this.preguntaMostrada = null;
    this.mostrarMsjCorrecto = false;
    this.borrarIntervalo();
  }

  elegirCategoria() {
    this.mostrarMsjCorrecto = false;

    const categoriaSalida = Math.floor(Math.random() * 3);

    switch (categoriaSalida) {
      case 0:
        this.categoriaActual = 'videojuegos';
        break;
      case 1:
        this.categoriaActual = 'ciencia';
        break;
      case 2:
        this.categoriaActual = 'cine';
        break;
      case 3:
        this.categoriaActual = 'historia';
        break;
    }

    this.imagenesService.getImagenJuegos().then((src) => {
      const fotoElegida = Math.floor(Math.random() * src.length);
      this.imagenSrc = src[fotoElegida].download_url;
    });
  }

  perder() {
    this.tiempo=-1;

    Swal.fire({
      icon: 'error',
      title: '¡Ups!',
      html: 'La respuesta era <b>' + this.preguntaMostrada.respuestaCorrecta + '</b>...',
      showDenyButton: true,
      confirmButtonText: '¡Otra partida!',
      denyButtonText: 'Ir a otros juegos'
    }).then((result) => {
      if (result.isDenied) {
        this.router.navigate(['/juegos']);
      }
    }).finally(() => {
      this.iniciarJuego();
    });
  }

  actualizarPuntaje() {
    const nombreUsuario = this.authService.nombreUsuario;

    const miPuntaje: Puntaje = {
      user: this.authService.nombreUsuario,
      categoria: 'preguntados',
      puntaje: 1,
      fecha: this.zonaHorariaService.getHoraArg()
    }

    this.puntajeService.updatePuntajePreguntados(nombreUsuario as string, miPuntaje);
  }

  manejarTiempo(){
    if(this.tiempo>0)
    {
      this.tiempo--;
      if (this.tiempo==0){
        this.perder();
      }
      else{
        this.tiempoId=setTimeout(() => {
          this.manejarTiempo();
        }, 1000);
      }
    }
  }

  borrarIntervalo(){
    if (this.tiempoId) {
      clearTimeout(this.tiempoId);
    }
  }

  mostrarSiguientePregunta() {
    this.borrarIntervalo();
    this.tiempo=10;
    this.tiempoId=setTimeout(() => {
      this.manejarTiempo()
    }, 1000);

    this.elegirCategoria();

    const preguntaMostradaActual = this.preguntaMostrada;
    const preguntasCategoria = PREGUNTAS[this.categoriaActual];

    if (preguntasCategoria && preguntasCategoria.length > 0) {
      do {
        const indiceAleatorio = Math.floor(Math.random() * preguntasCategoria.length);

        this.preguntaMostrada = preguntasCategoria[indiceAleatorio];
        this.opciones = this.shuffleOptions(this.preguntaMostrada.opciones);

        console.log(this.preguntaMostrada.respuestaCorrecta);
      } while (preguntaMostradaActual === this.preguntaMostrada)
    }
  }

  verificarRespuesta(respuesta: string) {
    if (respuesta === this.preguntaMostrada.respuestaCorrecta) {
      this.mostrarMsjCorrecto = true;
      this.mostrarSiguientePregunta();
      this.actualizarPuntaje();

      setTimeout(() => {
        this.mostrarMsjCorrecto=false;
      }, 2000);

      const woohoo = new Audio();
      woohoo.src = '../../../assets/juegos/sonidos/woohoo.wav'
      woohoo.play();
    } else {
      this.perder();
      const errorSnd = new Audio();
      errorSnd.src = '../../../assets/juegos/sonidos/error.wav'
      errorSnd.play();
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

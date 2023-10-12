import { Component, OnInit } from '@angular/core';
import { PREGUNTAS } from './preguntas-listado'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Puntaje } from 'src/app/interfaces/puntaje';
import { ZonahorariaService } from 'src/app/services/zonahoraria/zonahoraria.service';
import { PuntajeService } from 'src/app/services/puntaje/puntaje.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css', '../juegos-btn-empezar.css']
})
export class PreguntasComponent implements OnInit {
  juegoIniciado: boolean = false;
  jugadorPos: number = 0;
  vidas: number = 1;
  tablero: string[] = ['entrada'];
  categorias = Object.keys(PREGUNTAS);
  categoriaActual: string = '';
  preguntaMostrada: any = null;
  opciones: string[] = [];
  dadoSacado: string = '';
  canGirarDado: boolean = true;
  puntaje: number = 0;
  puntajeIndiceDificultad: number = 1;
  mostrarMsjCorrecto: boolean = false;
  cantidadCasillas = 28;
  puntajes: Puntaje[] = [];

  constructor(private router: Router, private authService: AuthService, private zonaHorariaService: ZonahorariaService, private puntajeService: PuntajeService) { }

  ngOnInit() {
    this.puntajeService.getPuntajesPreguntas().subscribe((listaPuntajes) => {
      this.puntajes = listaPuntajes;
    });
  }

  iniciarJuego() {
    this.consultarDificultad();
  }

  configurarJuego() {
    this.juegoIniciado = true;
    this.jugadorPos = 0;
    this.tablero = ['entrada'];
    this.categoriaActual = '';
    this.preguntaMostrada = null;
    this.dadoSacado = '';
    this.canGirarDado = true;
    this.puntaje = 0;
    this.mostrarMsjCorrecto = false;
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
    this.canGirarDado = false;
    this.mostrarMsjCorrecto = false;

    const dadoSalido = Math.floor(Math.random() * 6) + 1;
    this.avanzarPosicion(dadoSalido);
    this.dadoSacado = dadoSalido.toString();

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
      this.dadoSacado = '';
      this.mostrarSiguientePregunta();
    }, 2150);

    setTimeout(() => {
      const dados = new Audio();
      dados.src = '../../../assets/juegos/sonidos/dados.wav'
      dados.play();
    }, 500);
  }

  avanzarPosicion(_cantidad: number) {
    this.jugadorPos += _cantidad;

    if (this.jugadorPos > this.tablero.length - 2) {

      this.ganar();
    }
  }

  ganar() {
    this.categoriaActual = '';
    this.preguntaMostrada = null;
    this.canGirarDado = true;
    this.dadoSacado = '';

    Swal.fire({
      icon: 'success',
      title: '¡Felicidades!',
      html: 'Llegaste al final del recorrido...<br>¡Tu puntaje es de <b>' + this.puntaje + '</b>!',
    }).then(() => {
      this.iniciarJuego();
    });

    const nombreUsuario = this.authService.nombreUsuario;

    const miPuntaje: Puntaje = {
      user: this.authService.nombreUsuario,
      categoria: 'preguntas',
      puntaje: this.puntaje,
      fecha: this.zonaHorariaService.getHoraArg()
    }

    this.puntajeService.updatePuntajePreguntas(nombreUsuario as string, miPuntaje);

    const festejoSnd = new Audio();
    festejoSnd.src = '../../../assets/juegos/sonidos/festejo.wav'
    festejoSnd.play();
  }

  perder() {
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

  mostrarSiguientePregunta() {
    const preguntaMostradaActual = this.preguntaMostrada;
    const preguntasCategoria = PREGUNTAS[this.categoriaActual];

    if (preguntasCategoria && preguntasCategoria.length > 0) {
      do{
        const indiceAleatorio = Math.floor(Math.random() * preguntasCategoria.length);

        this.preguntaMostrada = preguntasCategoria[indiceAleatorio];
        this.opciones = this.shuffleOptions(this.preguntaMostrada.opciones);
  
        console.log(this.preguntaMostrada.respuestaCorrecta);
      }while(preguntaMostradaActual===this.preguntaMostrada)
    }
  }

  ganarPuntaje() {
    this.puntaje += 1 * this.puntajeIndiceDificultad;
  }

  consultarDificultad() {
    Swal.fire({
      icon: 'question',
      title: '¡Elige tu dificultad!',
      html: 'Facil: <i><b>3</b> vidas, <b>15</b> casilleros, <b>x1</b> punto por pregunta</i>' +
        '<br>Medio: <i><b>2</b> vidas, <b>30</b> casilleros, <b>x2</b> puntos por pregunta</i>' +
        '<br>Difícil: <i><b>1</b> vida, <b>45</b> casilleros, <b>x3</b> puntos por pregunta</i>',
      showConfirmButton: true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Fácil',
      denyButtonText: 'Medio',
      cancelButtonText: 'Difícil',
      confirmButtonColor: 'lime',
      denyButtonColor: 'orange',
      cancelButtonColor: 'red'
    }).then((res) => {
      if (res.isConfirmed) {
        this.vidas = 3;
        this.cantidadCasillas = 15;
        this.puntajeIndiceDificultad = 1;
      }

      if (res.isDenied) {
        this.vidas = 2;
        this.cantidadCasillas = 30;
        this.puntajeIndiceDificultad = 2;
      }

      if (res.isDismissed) {
        this.vidas = 1;
        this.cantidadCasillas = 45;
        this.puntajeIndiceDificultad = 3;
      }

      this.configurarJuego();
    });
  }

  verificarRespuesta(respuesta: string) {
    if (respuesta === this.preguntaMostrada.respuestaCorrecta) {
      this.ganarPuntaje();
      this.mostrarMsjCorrecto = true;

      const woohoo = new Audio();
      woohoo.src = '../../../assets/juegos/sonidos/woohoo.wav'
      woohoo.play();
    } else {
      this.vidas--;

      if (this.vidas < 1) {
        this.perder();
      }
      else {
        Swal.fire({
          title: '¡Uy! perdiste una vida...',
          html: '<br>Te queda(n) <b>' + this.vidas + '</b> vidas,<br>Vuelve a lanzar el dado...'
        });

        const errorSnd = new Audio();
        errorSnd.src = '../../../assets/juegos/sonidos/error.wav'
        errorSnd.play();
      }
    }

    this.categoriaActual = '';
    this.preguntaMostrada = null;
    this.canGirarDado = true;

    setTimeout(() => {
      this.mostrarMsjCorrecto = false;
    }, 2150);
  }

  shuffleOptions(options: string[]) {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }
}

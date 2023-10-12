import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Puntaje } from 'src/app/interfaces/puntaje';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { PuntajeService } from 'src/app/services/puntaje/puntaje.service';
import { ZonahorariaService } from 'src/app/services/zonahoraria/zonahoraria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrls: ['./mayor-o-menor.component.css', '../juegos-btn-empezar.css']
})
export class MayorOMenorComponent implements OnInit {
  usuarioLogeado: any;
  juegoIniciado: boolean = false;
  numeroActual: number = 0;
  intentos: number = 0;
  resultadoCorrecto: boolean = false;
  resultado: string = '';
  racha: number = 0;
  rachaCarry: number = 0;
  primerCarta: boolean = false;
  puntajes: Puntaje[] = [];

  constructor(private authService: AuthService, private zonaHorariaService: ZonahorariaService, private puntajeService: PuntajeService) { }

  ngOnInit(): void {
    this.usuarioLogeado = this.authService.usuarioLogeado;

    this.puntajeService.getPuntajesMayorOMenor().subscribe((listaPuntajes) => {
      this.puntajes = listaPuntajes;
    });
  }

  iniciarJuego() {
    this.juegoIniciado = true;
    this.numeroActual = this.darCartaRandom();
    this.intentos = 0;
    this.resultado = '';
    this.racha = 0;
  }

  darCartaRandom() {
    let nuevoNumero: number = this.numeroActual;

    do {
      nuevoNumero = Math.floor(Math.random() * 10) + 1;
    }
    while (nuevoNumero === this.numeroActual);

    return nuevoNumero;
  }

  getImagenCarta(numero: number): string {
    return `"../../../../../assets/juegos/mayor-o-menor/cartas_rojas/Clovers_${numero}_white.png`;
  }

  resultadoFueCorrecto() {
    this.resultadoCorrecto = true;
    this.racha++;

    const goodHitSnd = new Audio();
    goodHitSnd.src = '../../../assets/juegos/sonidos/goodHit.wav'
    goodHitSnd.play();
  }

  resultadoFueIncorrecto() {
    this.rachaCarry = this.racha;
    this.racha = 0;

    Swal.fire({
      icon: 'error',
      title: '¡Ups!',
      html:
        'Tu racha fue de <b>' + this.rachaCarry + '</b>... <br>¿Deseas <b>compartir</b> tu resultado?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Compartir resultado',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: 'Subiendo puntaje...',
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          }
        }).then((result) => {

          this.subirResultado();

          if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
              icon: 'success',
              title: '¡Listo!',
              text: 'Si tu puntaje es lo suficientemente alto, puedes llegar al ranking de mejores partidas',
            });
          }
        });
      }
    });
  }

  subirResultado() {
    const miPuntaje: Puntaje = {
      user: this.authService.nombreUsuario,
      categoria: 'mayor-o-menor',
      puntaje: this.rachaCarry,
      fecha: this.zonaHorariaService.getHoraArg()
    }

    this.puntajeService.addPuntajeMayorOMenor(miPuntaje).then(() => {
      this.iniciarJuego();
      this.resultadoCorrecto = false;
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'Algo salió mal cargando tu resultado...',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Reintentar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subirResultado();
        }
      });
    });
  }

  adivinarMayor() {
    const nuevoNumero = this.darCartaRandom();

    if (nuevoNumero > this.numeroActual) {
      this.resultadoFueCorrecto();
    } else {
      this.resultadoFueIncorrecto();
    }

    if (!this.primerCarta) {
      this.primerCarta = true;
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

    if (!this.primerCarta) {
      this.primerCarta = true;
    }

    this.numeroActual = nuevoNumero;
    this.intentos++;
  }
}
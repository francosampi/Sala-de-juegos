import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

const palabrasConPistas = [
  { palabra: 'perro', pista: 'Animal doméstico' },
  { palabra: 'gato', pista: 'Animal doméstico' },
  { palabra: 'elefante', pista: 'Animal grande de África' },
  { palabra: 'jirafa', pista: 'Animal con cuello largo' },
  { palabra: 'tigre', pista: 'Felino rayado' },
  { palabra: 'cocodrilo', pista: 'Reptil acuático' },
  { palabra: 'koala', pista: 'Animal australiano' },
  { palabra: 'ballena', pista: 'Mamífero marino' },
  { palabra: 'tortuga', pista: 'Reptil con caparazón' },
  { palabra: 'italia', pista: 'País en Europa' },
  { palabra: 'japon', pista: 'País en Asia' },
  { palabra: 'australia', pista: 'País en Oceanía' },
  { palabra: 'brasil', pista: 'País en América del Sur' },
  { palabra: 'china', pista: 'País en Asia' },
  { palabra: 'rusia', pista: 'País en Europa y Asia' },
  { palabra: 'canada', pista: 'País en América del Norte' },
  { palabra: 'suecia', pista: 'País en Europa' },
  { palabra: 'india', pista: 'País en Asia' },
  { palabra: 'mexico', pista: 'País en América del Norte' },
  { palabra: 'silla', pista: 'Mueble para sentarse' },
  { palabra: 'mesa', pista: 'Mueble para poner cosas' },
  { palabra: 'armario', pista: 'Mueble para guardar ropa' },
  { palabra: 'sofa', pista: 'Mueble para descansar' },
  { palabra: 'cama', pista: 'Mueble para dormir' },
  { palabra: 'ropero', pista: 'Mueble para ropa' },
  { palabra: 'rojo', pista: 'Color cálido' },
  { palabra: 'verde', pista: 'Color de la naturaleza' },
  { palabra: 'azul', pista: 'Color del cielo' },
  { palabra: 'amarillo', pista: 'Color brillante' },
  { palabra: 'naranja', pista: 'Color frutal' },
];

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css', '../juegos-btn-empezar.css']
})
export class AhorcadoComponent implements OnInit {
  juegoIniciado: boolean = false;
  palabraAAdivinar: string='';
  pista: string='';
  letrasAdivinadas: string[] = [];
  intentosRestantes: number = 6;
  letrasPresionadas: Set<string> = new Set();
  botonesColores: { [key: string]: string } = {};
  mostrarPista: boolean=false;
  letraElegidaSinAcentos: string='';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  iniciarJuego(): void {
    this.elegirPalabra();
    this.juegoIniciado=true;
    this.letrasAdivinadas = [];
    this.intentosRestantes = 6;
    this.letrasPresionadas.clear();
    this.botonesColores = {};
    this.mostrarPista=false;

    console.log(this.palabraAAdivinar);
  }

  elegirPalabra(): void{
    const indice=Math.floor(Math.random() * palabrasConPistas.length);

    this.palabraAAdivinar=palabrasConPistas[indice].palabra;
    this.pista=palabrasConPistas[indice].pista;
  }

  manejarAdivinanza(letra: string): void {
    if (this.sePuedeSeguirAdivinando() && !this.letrasPresionadas.has(letra)) {
      this.letrasPresionadas.add(letra);

      if (this.palabraAAdivinar.includes(letra)) {
        if (!this.letrasAdivinadas.includes(letra)) {
          this.letrasAdivinadas.push(letra);
          this.botonesColores[letra] = '#7EFF3E';

          if(this.palabraFueAdivinada())
          {
            Swal.fire({
              icon: 'success',
              title: 'Enhorabuena!',
              html:
              'La palabra era <b>'+this.palabraAAdivinar+'</b>...',
              showCancelButton:true,
              showDenyButton: true,
              confirmButtonText: 'Reiniciar',
              denyButtonText: 'Ir a otros juegos',
              cancelButtonText: 'Cancelar',
            }).then((result) => {
              if (result.isConfirmed) {
                this.iniciarJuego();
              } else if (result.isDenied) {
                this.router.navigate(['/juegos']);
              }
            });
          }

        }
      } else {
        this.intentosRestantes--;
        this.botonesColores[letra] = '#FF3E3E';

        if(this.intentosRestantes==0)
        {
          Swal.fire({
            icon: 'error',
            title: 'Ups! ya no te quedan intentos...',
            html:
            'La palabra era <b>'+this.palabraAAdivinar+'</b>...' +
            '¡Intentalo de nuevo!',
            showCancelButton:true,
            showDenyButton: true,
            confirmButtonText: 'Reiniciar',
            denyButtonText: 'Ir a otros juegos',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.iniciarJuego();
            } else if (result.isDenied) {
              this.router.navigate(['/juegos']);
            }
          });
        }
      }
    }
  }

  palabraFueAdivinada(): boolean {

    const letrasAdivinadasUnicas = Array.from(new Set(this.letrasAdivinadas)).sort().join('');
    const palabraAAdivinarUnica = Array.from(new Set(this.palabraAAdivinar.split(''))).sort().join('');

    return letrasAdivinadasUnicas === palabraAAdivinarUnica;
  }

  sePuedeSeguirAdivinando(): boolean{
    return this.intentosRestantes>0 && !this.palabraFueAdivinada();
  }

  togglePista(): void{
    this.mostrarPista = !this.mostrarPista;
  }
}

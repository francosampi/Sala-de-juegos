import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent {

  infoJuego(juegoIndex: number){
    
    let msj: string=''

    switch(juegoIndex)
    {
      case 1:
        msj='<h3>Ahorcado</h3><br><br>'+
        'Se te dará una <b>palabra</b> y un total de <b>6 intentos</b> para adivinarla.<br><br>'+
        'Adivina la palabra letra por letra haciendo click en los botones del <b>teclado</b>.<br><br>'+
        '¡Y cuidado! equivocarte costará <b>1 intento</b>...<br><br>'+
        'Al decifrar la palabra... acumularás <b>1 punto por intento restante</b>, es decir, si adivinas la palabra sin equivocarte... ¡ganarás <b>6 puntos!</b><br><br>'+
        'Acumula una gran cantidad de puntos para llegar al <b>tablero</b> de jugadores... ¿más desvividos?<br><br>'+
        '¡Buena suerte!'
        break;
      case 2:
        msj='<h3>¿Mayor o menor?</h3><br><br>'+
        'Se te dará una <b>carta</b> de un mazo del <b>1 al 10</b>.<br><br>'+
        'Deberás adivinar si la próxima carta será <b>mayor</b> o <b>menor.</b><br><br>'+
        'En caso de acertar, pasarás a la siguiente carta, y acumularás <b>puntos de racha!</b><br><br>'+
        'Si te equivocas, perderás la partida. ¡Exacto! no hay vidas ni intentos extra.<br><br>'+
        'Consigue la mayor racha posible para aparecer en el <b>tablero</b> de mejores jugadores (o los más suertudos).<br><br>'+
        '¡Buena suerte!'
        break;
       case 3:
        msj='<h3>Preguntas y respuestas</h3><br><br>'+
        '¡El <b>jugador</b> deberá atravesar un <b>tablero</b> y llegar a la <b>meta</b>!<br><br>'+
        'Para lograrlo, deberás girar un <b>dado</b> y contestar una <b>pregunta</b> de una <b>categoría</b> en específico...<br><br>'+
        'Este juego cuenta con modificadores de <b>dificultad</b>:<br><br>'+
        'Estas ajustarán la cantidad de <b>puntos ganados por pregunta acertada</b>, las <b>vidas</b> al empezar la partida, ¡y la <b>longitud</b> del tablero!<br><br>'+
        '¡Buena suerte!'
        break;
    }
    Swal.fire({
      html: msj
    });
  }
}

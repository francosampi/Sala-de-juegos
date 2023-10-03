import { Component, Input } from '@angular/core';
import { Puntaje } from 'src/app/interfaces/puntaje';

@Component({
  selector: 'app-tabla-puntajes',
  templateUrl: './tabla-puntajes.component.html',
  styleUrls: ['./tabla-puntajes.component.css']
})
export class TablaPuntajesComponent {
  @Input() listaPuntajes: Puntaje[]=[];
}

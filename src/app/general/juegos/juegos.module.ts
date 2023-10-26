import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './menu-juegos/juegos.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { ChatModule } from '../chat/chat.module';
import { TablaPuntajesComponent } from './tabla-puntajes/tabla-puntajes.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';


@NgModule({
  declarations: [
    JuegosComponent,
    MayorOMenorComponent,
    AhorcadoComponent,
    TablaPuntajesComponent,
    PreguntasComponent,
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    ChatModule,
  ],
  exports: [
    JuegosComponent
  ]
})
export class JuegosModule { }

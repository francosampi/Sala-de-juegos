import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestaComponent } from './encuesta.component';
import { EncuestaRoutingModule } from './encuesta-routing.module';



@NgModule({
  declarations: [
    EncuestaComponent
  ],
  imports: [
    CommonModule,
    EncuestaRoutingModule
  ],
  exports: [
    EncuestaComponent
  ]
})
export class EncuestaModule { }

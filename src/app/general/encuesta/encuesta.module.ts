import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestaComponent } from './encuesta.component';
import { EncuestaRoutingModule } from './encuesta-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EncuestaComponent
  ],
  imports: [
    CommonModule,
    EncuestaRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    EncuestaComponent
  ]
})
export class EncuestaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './registrar.component';
import { FormsModule } from '@angular/forms';
import { RegistrarRoutingModule } from './registrar-routing.module';



@NgModule({
  declarations: [
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RegistrarRoutingModule
  ],
  exports: [
    RegistrarComponent
  ]
})
export class RegistrarModule { }

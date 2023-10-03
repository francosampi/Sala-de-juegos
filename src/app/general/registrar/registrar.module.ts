import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './registrar.component';
import { FormsModule } from '@angular/forms';
import { RegistrarRoutingModule } from './registrar-routing.module';
import { NavbarModule } from '../navbar/navbar.module';



@NgModule({
  declarations: [
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RegistrarRoutingModule,
    NavbarModule
  ],
  exports: [
    RegistrarComponent
  ]
})
export class RegistrarModule { }

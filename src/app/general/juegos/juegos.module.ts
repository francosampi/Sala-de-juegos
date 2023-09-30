import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../navbar/navbar.module';
import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './menu-juegos/juegos.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';


@NgModule({
  declarations: [
    JuegosComponent,
    MayorOMenorComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    NavbarModule
  ],
  exports: [
    JuegosComponent
  ]
})
export class JuegosModule { }

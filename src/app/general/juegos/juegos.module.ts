import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../navbar/navbar.module';
import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './menu-juegos/juegos.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { ChatModule } from '../chat/chat.module';


@NgModule({
  declarations: [
    JuegosComponent,
    MayorOMenorComponent,
    AhorcadoComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    NavbarModule,
    ChatModule
  ],
  exports: [
    JuegosComponent
  ]
})
export class JuegosModule { }

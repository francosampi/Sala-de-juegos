import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidoComponent } from './bienvenido.component';
import { NavbarModule } from '../navbar/navbar.module';
import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { ChatModule } from '../chat/chat.module';



@NgModule({
  declarations: [
    BienvenidoComponent
  ],
  imports: [
    CommonModule,
    BienvenidoRoutingModule,
    NavbarModule,
    ChatModule
  ],
  exports: [
    BienvenidoComponent
  ]
})
export class BienvenidoModule { }

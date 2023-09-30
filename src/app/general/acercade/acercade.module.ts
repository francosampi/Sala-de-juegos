import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcercadeComponent } from './acercade.component';
import { NavbarModule } from '../navbar/navbar.module';
import { AcercadeRoutingModule } from './acercade-routing.module';


@NgModule({
  declarations: [
    AcercadeComponent
  ],
  imports: [
    CommonModule,
    AcercadeRoutingModule,
    NavbarModule
  ],
  exports: [
    AcercadeComponent
  ]
})
export class AcercadeModule { }

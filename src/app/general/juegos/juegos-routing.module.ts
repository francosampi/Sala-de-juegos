import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './menu-juegos/juegos.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';

const routes: Routes = [
  { path: '', component: JuegosComponent },
  { path: 'mayor-o-menor', component: MayorOMenorComponent },
  { path: 'ahorcado', component: AhorcadoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosRoutingModule {}
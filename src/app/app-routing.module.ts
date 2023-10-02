import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularToastifyModule } from 'angular-toastify';
import { BienvenidoComponent } from './general/bienvenido/bienvenido.component';

const routes: Routes = [
  { path: "login", loadChildren: () => import('./general/login/login.module').then(m => m.LoginModule) },
  { path: "", component: BienvenidoComponent},
  { path: "registrar", loadChildren: () => import('./general/registrar/registrar.module').then(m => m.RegistrarModule) },
  { path: "juegos", loadChildren: () => import('./general/juegos/juegos.module').then(m => m.JuegosModule)},
  { path: "acercade", loadChildren: () => import('./general/acercade/acercade.module').then(m => m.AcercadeModule)},

  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

  { path: "**", loadChildren: () => import('./general/error/error.module').then(m => m.ErrorModule) },
]; 

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AngularToastifyModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

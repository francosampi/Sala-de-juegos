import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './ejemploInputOutput/page/main/main.component';
import { ComponenteListadoComponent } from './ejemploInputOutput/componente/componente-listado/componente-listado.component';
import { ComponenteAltaComponent } from './ejemploInputOutput/componente/componente-alta/componente-alta.component';
import { ComponenteDetalleComponent } from './ejemploInputOutput/componente/componente-detalle/componente-detalle.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NavbarModule } from './general/navbar/navbar.module';
import { BienvenidoModule } from './general/bienvenido/bienvenido.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ComponenteListadoComponent,
    ComponenteAltaComponent,
    ComponenteDetalleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NavbarModule,
    BienvenidoModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

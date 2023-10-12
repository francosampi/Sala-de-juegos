import { Injectable, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  usuarioLogeado: Observable<any>;
  nombreUsuario: string | null = null;

  //TODO: sacar del ctor
  constructor(private auth: AngularFireAuth) {

    this.usuarioLogeado=this.auth.authState;

    this.usuarioLogeado.subscribe((user)=>{
      this.nombreUsuario=this.getNombreUser(user.email);
    });
  }

  ngOnInit() {}

  getUser() {
    return this.auth.currentUser;
  }

  getNombreUser(_email: string | null = '') {
    let nombreUser: string | undefined = '';

    if (_email !== null) {
      const indiceArroba = _email?.indexOf('@');
      if (indiceArroba !== -1) {
        nombreUser = _email?.slice(0, indiceArroba);
      }
    }
    return nombreUser;
  }

  async registrarse(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async iniciarSesion(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  cerrarSesion() {
    return this.auth.signOut();
  }
}

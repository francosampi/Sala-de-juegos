import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  mailUsuario: string | undefined;

  constructor(private auth: Auth) {
    this.mailUsuario = this.auth.currentUser?.email?.toString();
  }

  obtenerMailDelUser(){
    return this.mailUsuario;
  }

  registrarse(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  iniciarSesion(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  cerrarSesion() {
    return signOut(this.auth);
  }
}

import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private auth: Auth) {
  }

  getUser(){
    return this.auth.currentUser;
  }

  getNombreUser(){
    let nombreUser: string | undefined='';

    if(this.auth.currentUser?.email !== null)
    {
      const indiceArroba = this.auth.currentUser?.email?.indexOf('@');
      if (indiceArroba !== -1) {
        nombreUser = this.auth.currentUser?.email?.slice(0, indiceArroba);
      }
    }

    return nombreUser;
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

import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarioLogeado: any;
  usuarioNombre: string | undefined = '';

  constructor(private router: Router, private auth: Auth, private authService: AuthService) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        this.usuarioLogeado = this.authService.getUser();
        this.usuarioNombre = this.authService.getNombreUser();
      }
    })
  }

  irAJuegosHandler() {
    if (!this.usuarioLogeado) {
      Swal.fire({
        title: '¡Debes iniciar sesión!',
        html: "Necesitas una cuenta para acceder a los juegos.<br>Puedes <b>entrar</b> o <b>crear</b> una cuenta nueva...",
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#FFD76B',
        confirmButtonText: 'Entrar',
        denyButtonText: 'Registrarse'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
    else {
      this.router.navigate(['/juegos']);
    }
  }

  salir() {
    if (this.usuarioLogeado) {
      Swal.fire({
        title: '¡Te vamos a extrañar!',
        html: "Esta acción redirige automáticamente al <b>Inicio de sesión<b>",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Cerrar sesión'
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.cerrarSesion().then(() => {
            this.router.navigate(['/login']);
          });
        }
      });
    }
  }
}

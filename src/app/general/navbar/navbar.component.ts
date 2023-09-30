import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private authService: AuthService) { }

  irAJuegos() {
    this.router.navigate(['/juegos']);
  }

  irAAcercaDe(){
    this.router.navigate(['/acercade']);
  }

  salir(){
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      text: "¡Te vamos a extrañar!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.cerrarSesion().then(()=>{
          this.router.navigate(['/login']);
        }); 
      }
    });
  }
}

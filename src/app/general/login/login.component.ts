import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles/forms.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() { }

  entrar(email: string, password: string) {
    this.authService.iniciarSesion(email, password).then(()=>{
      this.router.navigate(['/']);
    }).catch(()=>{
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Algo salió mal al iniciar sesión...',
      });
    });
  }
}
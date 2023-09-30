import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { LogsService } from 'src/app/services/logs/logs.service';
import { ZonahorariaService } from 'src/app/services/zonahoraria/zonahoraria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['../../styles/forms.css']
})
export class RegistrarComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService, private logsService: LogsService, private zonaHorariaService: ZonahorariaService) { }

  registrarUsuario(email: string, password: string) {

      this.authService.registrarse(email, password).then(()=>{

        Swal.fire({
          title: 'Registrando usuario...',
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
              icon: 'success',
              title: '¡Bienvenido!',
              text: 'Tu cuenta ha sido creada.',
            });
          }

          const logeo=this.logsService.addLog({
            mail: this.email.toString(),
            fecha: this.zonaHorariaService.getHoraArg(),
          });
          
          this.router.navigate(['/']);
          
          console.log(logeo);
        });
      }).catch((e)=>{
        let msj = 'Algo salió mal al registrar la cuenta...';

        if (e.code == 'auth/email-already-in-use')
        {
          msj = 'El mail ' +email+ ' ya fue registrado...';
        }

          Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: msj,
          });
    });
    /*
    var usuario = { 'username': username, 'password': password };

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    storedUsers.push(usuario);

    console.log(storedUsers);

    localStorage.setItem('users', JSON.stringify(storedUsers));
    */
  }
}

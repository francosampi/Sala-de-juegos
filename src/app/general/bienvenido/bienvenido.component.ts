import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit{

  usuarioNombre : string | null = null;
  mostrarBotones: boolean = false;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.usuarioLogeado.subscribe(()=>{
      this.usuarioNombre = this.authService.nombreUsuario;
    });
  }
}

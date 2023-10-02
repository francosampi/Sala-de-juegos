import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit{

  currentUser : string | undefined;

  mostrarBotones: boolean = false;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    const nombreUser = this.authService.getNombreUser();

    if(nombreUser!=undefined)
    {
      this.currentUser = nombreUser
    }
  }
}

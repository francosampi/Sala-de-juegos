import { Component, Input, OnInit } from '@angular/core';
import { Puntaje } from 'src/app/interfaces/puntaje';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-tabla-puntajes',
  templateUrl: './tabla-puntajes.component.html',
  styleUrls: ['./tabla-puntajes.component.css']
})
export class TablaPuntajesComponent implements OnInit {

  constructor(private authService: AuthService) {}

  usuarioLogeado: string | null = null;
  mostrarRanking: boolean = false;

  ngOnInit(): void {
    this.usuarioLogeado = this.authService.nombreUsuario;
  }

  @Input() listaPuntajes: Puntaje[]=[];

  toggleRanking(){
    this.mostrarRanking=!this.mostrarRanking;
  }
}

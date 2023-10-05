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

  usuarioLogeado: string | undefined='';

  ngOnInit(): void {
    this.usuarioLogeado = this.authService.getNombreUser();
  }

  @Input() listaPuntajes: Puntaje[]=[];
}

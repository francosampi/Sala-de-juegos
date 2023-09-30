import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZonahorariaService {

  getHoraArg(): string {
    const fechaArgentina = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });

    return fechaArgentina;
  }

  constructor() { }
}

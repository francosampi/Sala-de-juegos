import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor() { }

  async getImagenJuegos() {
    const apiUrl = 'https://picsum.photos/v2/list';

    return fetch(apiUrl, {
    })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        throw new Error(`Error al obtener las imagenes: ${error.message}`);
      });
  }
}

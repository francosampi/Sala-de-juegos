import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, limit, orderBy, query } from 'firebase/firestore';
import { Puntaje } from 'src/app/interfaces/puntaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  constructor(private firestore: Firestore) { }

  addPuntaje(puntaje: Puntaje){
    const puntajeCollection = collection(this.firestore, 'puntajes');
    return addDoc(puntajeCollection, puntaje);
  }

  getPuntajes(): Observable<Puntaje[]>{
    const chatCollection = collection(this.firestore, 'puntajes');
    const q = query(chatCollection, orderBy('puntaje', 'desc'), limit(10));

    return collectionData(q) as Observable<Puntaje[]>;
  }
}

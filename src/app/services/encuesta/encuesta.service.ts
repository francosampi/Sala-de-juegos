import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, limit, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Encuesta } from 'src/app/interfaces/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private firestore: Firestore) { }
  
  addEncuesta(encuesta: Encuesta) {
    const chatCollection = collection(this.firestore, 'encuestas');
    return addDoc(chatCollection, encuesta);
  }

  getEncuestas(): Observable<Encuesta[]>{
    const chatCollection = collection(this.firestore, 'encuestas');
    const q = query(chatCollection, limit(20), orderBy('fecha', 'desc'));
    return collectionData(q) as Observable<Encuesta[]>;
  }
}

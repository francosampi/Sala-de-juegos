import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDocs, increment, limit, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { Puntaje } from 'src/app/interfaces/puntaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  constructor(private firestore: Firestore) { }

  addPuntajeMayorOMenor(puntaje: Puntaje) {
    const puntajeCollection = collection(this.firestore, 'puntajes-mom');
    return addDoc(puntajeCollection, puntaje);
  }

  addPuntajeAhorcado(puntaje: Puntaje) {
    const puntajeCollection = collection(this.firestore, 'puntajes-ahorcado');
    return addDoc(puntajeCollection, puntaje);
  }

  async updatePuntajeAhorcado(user: string, puntaje: Puntaje) {
    const puntajeCollection = collection(this.firestore, 'puntajes-ahorcado');
    const q = query(puntajeCollection, where('user', '==', user), limit(1));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const documentSnapshot = querySnapshot.docs[0];
        const docRef = doc(puntajeCollection, documentSnapshot.id);

        await updateDoc(docRef, {puntaje: increment(puntaje.puntaje)});
        console.log('Documento actualizado con éxito.');
      } else {
        this.addPuntajeAhorcado(puntaje);
        console.log('No se encontraron documentos con el nombre proporcionado.');
      }
    } catch (error) {
      console.error('Error al buscar y actualizar el documento:', error);
    }
  }

  getPuntajesMayorOMenor(): Observable<Puntaje[]> {
    const chatCollection = collection(this.firestore, 'puntajes-mom');
    const q = query(chatCollection, orderBy('puntaje', 'desc'), limit(5));

    return collectionData(q) as Observable<Puntaje[]>;
  }

  getPuntajesAhorcado(): Observable<Puntaje[]> {
    const chatCollection = collection(this.firestore, 'puntajes-ahorcado');
    const q = query(chatCollection, orderBy('puntaje', 'desc'), limit(5));

    return collectionData(q) as Observable<Puntaje[]>;
  }
}

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

  addPuntajePreguntas(puntaje: Puntaje) {
    const puntajeCollection = collection(this.firestore, 'puntajes-preguntas');
    return addDoc(puntajeCollection, puntaje);
  }

  addPuntajePreguntados(puntaje: Puntaje) {
    const puntajeCollection = collection(this.firestore, 'puntajes-preguntados');
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

        await updateDoc(docRef, { puntaje: increment(puntaje.puntaje) });
      } else {
        this.addPuntajeAhorcado(puntaje);
      }
    } catch (error) {
      console.error('Error al buscar y actualizar el documento:', error);
    }
  }

  async updatePuntajePreguntas(user: string, puntaje: Puntaje) {
    const puntajeCollection = collection(this.firestore, 'puntajes-preguntas');
    const q = query(puntajeCollection, where('user', '==', user), limit(1));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const documentSnapshot = querySnapshot.docs[0];
        const docRef = doc(puntajeCollection, documentSnapshot.id);

        await updateDoc(docRef, { puntaje: increment(puntaje.puntaje) });
      } else {
        this.addPuntajePreguntas(puntaje);
      }
    } catch (error) {
      console.error('Error al buscar y actualizar el documento:', error);
    }
  }

  async updatePuntajePreguntados(user: string, puntaje: Puntaje) {
    const puntajeCollection = collection(this.firestore, 'puntajes-preguntados');
    const q = query(puntajeCollection, where('user', '==', user), limit(1));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const documentSnapshot = querySnapshot.docs[0];
        const docRef = doc(puntajeCollection, documentSnapshot.id);

        await updateDoc(docRef, { puntaje: increment(puntaje.puntaje), fecha: puntaje.fecha });
      } else {
        this.addPuntajePreguntados(puntaje);
      }
    } catch (error) {
      console.error('Error al buscar y actualizar el documento:', error);
    }
  }

  getPuntajesMayorOMenor(): Observable<Puntaje[]> {
    const chatCollection = collection(this.firestore, 'puntajes-mom');
    const q = query(chatCollection, orderBy('puntaje', 'desc'), limit(20));

    return collectionData(q) as Observable<Puntaje[]>;
  }

  getPuntajesAhorcado(): Observable<Puntaje[]> {
    const chatCollection = collection(this.firestore, 'puntajes-ahorcado');
    const q = query(chatCollection, orderBy('puntaje', 'desc'), limit(20));

    return collectionData(q) as Observable<Puntaje[]>;
  }

  getPuntajesPreguntas(): Observable<Puntaje[]> {
    const chatCollection = collection(this.firestore, 'puntajes-preguntas');
    const q = query(chatCollection, orderBy('puntaje', 'desc'), limit(20));

    return collectionData(q) as Observable<Puntaje[]>;
  }

  getPuntajesPreguntados(): Observable<Puntaje[]> {
    const chatCollection = collection(this.firestore, 'puntajes-preguntados');
    const q = query(chatCollection, orderBy('puntaje', 'desc'), limit(20));

    return collectionData(q) as Observable<Puntaje[]>;
  }
}

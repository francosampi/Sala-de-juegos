import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, DocumentData } from '@angular/fire/firestore';
import { ChatMsj } from '../../interfaces/chat-msj';
import { Observable } from 'rxjs';
import { limit, orderBy, query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore) { 
  }

  addMsjChat(chatMsj: ChatMsj) {
    const chatCollection = collection(this.firestore, 'chat');
    return addDoc(chatCollection, chatMsj);
  }

  getMsjChat(): Observable<ChatMsj[]>{
    const chatCollection = collection(this.firestore, 'chat');
    const q = query(chatCollection, orderBy('fecha'), limit(20));

    return collectionData(q) as Observable<ChatMsj[]>;
  }
  
  /* 
  getMsjChat(): Observable<ChatMsj[]> {
    const chatCollection = collection(this.firestore, 'chat');
    const q = query(chatCollection, orderBy('fecha'));

    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const chatMsjArray: ChatMsj[] = [];
        querySnapshot.forEach((doc) => {
          const chatMsjData = doc.data() as ChatMsj;
          chatMsjArray.push(chatMsjData);
        });
        return chatMsjArray;
      })
    );
  }
  */

  /*
  getMsjChat(): Observable<ChatMsj[]> {
    const chatCollection = collection(this.firestore, 'chat');
    const q = query(chatCollection, orderBy('fecha'));

    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const chatMsjArray: ChatMsj[] = [];
        querySnapshot.forEach((doc) => {
          const chatMsjData = doc.data() as ChatMsj;
          chatMsjArray.push(chatMsjData);
        });
        return chatMsjArray;
      })
    );
  }
  */
}
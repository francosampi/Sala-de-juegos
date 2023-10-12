import { Injectable, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { ChatMsj } from '../../interfaces/chat-msj';
import { Observable } from 'rxjs';
import { limit, orderBy, query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {}

  addMsjChat(chatMsj: ChatMsj) {
    const chatCollection = collection(this.firestore, 'chat');
    return addDoc(chatCollection, chatMsj);
  }

  getMsjChat(): Observable<ChatMsj[]> {
    const chatCollection = collection(this.firestore, 'chat');
    const q = query(chatCollection, limit(20), orderBy('fecha', 'desc'));
    return collectionData(q) as Observable<ChatMsj[]>;
  }
}
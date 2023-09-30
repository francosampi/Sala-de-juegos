import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Log } from '../../interfaces/log';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private firestore: Firestore) { }

  addLog(log: Log){
    const logsCollection = collection(this.firestore, 'logs');
    return addDoc(logsCollection, log);
  }
}
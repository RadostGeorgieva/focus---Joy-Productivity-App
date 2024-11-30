// src/app/firestore-check.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreCheckService {
  constructor(private firestore: AngularFirestore) {}

  checkConnection(): Observable<any> {
    return this.firestore.collection('to-do-lists').valueChanges();  // Replace with your collection name
  }
}

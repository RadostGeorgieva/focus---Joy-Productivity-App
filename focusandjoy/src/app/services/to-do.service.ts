import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private collectionName = 'to-do-lists';

  constructor(private firestore: AngularFirestore) {}

  getToDoLists(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' });
  }

  addToDoList(toDoList: any) {
    return this.firestore.collection(this.collectionName).add(toDoList);
  }

  updateToDoList(id: string, updatedData: any) {
    return this.firestore.collection(this.collectionName).doc(id).update(updatedData);
  }

  deleteToDoList(id: string) {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}

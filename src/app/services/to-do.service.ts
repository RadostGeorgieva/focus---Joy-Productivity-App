import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { ToDoItem, ToDoList } from '../models/to-do.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private collectionName = 'to-do-lists';
  private toDoListSubject = new BehaviorSubject<ToDoList[]>([]);

  constructor(private firebaseService: FirebaseService) {}


  getCollectionData():Observable<ToDoList[]> {
    return this.firebaseService.listenToToDoCollection(this.collectionName); 
  }


  fetchData() {
    this.firebaseService.listenToToDoCollection(this.collectionName).subscribe(data => {
      this.toDoListSubject.next(data); 
    });
  }

  //adding to item in  to-do list
  async addItemToList(docId: string, toDoItem: string): Promise<void> {
    return this.firebaseService.addItemToList(this.collectionName,docId, toDoItem)
  }
  //adding to-do list
  addToDoList(toDoList: ToDoList) {
    let user = ""
    //return this.firebaseService.addDocument(this.collectionName,user, toDoList);
  }
    // Update existing to-do list
    updateToDoList(id: string, toDoItem: string, index:number) {
      return this.firebaseService.updateDocument(this.collectionName, id, index, toDoItem);
    }
  
    // Delete  ENTIRE to-do list
    deleteToDoList(id: string) {
      return this.firebaseService.deleteDocument(this.collectionName, id);
    }
    //delete only selected Item
    deleteToDoItem(docId: string, itemIndex: number): Promise<void> {
      return this.firebaseService.deleteToDoItem(this.collectionName, docId, itemIndex);
    }
  }



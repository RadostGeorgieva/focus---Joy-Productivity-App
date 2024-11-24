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
  private toDoListSubject = new BehaviorSubject<ToDoList[]>([]); // Holds the latest ToDoList

  constructor(private firebaseService: FirebaseService) {}


  getToDoLists():Observable<ToDoList[]> {
    return this.firebaseService.listenToCollection(this.collectionName); // Components will subscribe to this
  }

  // Fetch data from Firebase and update the BehaviorSubject
  fetchData() {
    this.firebaseService.listenToCollection(this.collectionName).subscribe(data => {
      this.toDoListSubject.next(data); // Update the subject with the latest data
    });
  }

  // Add a new item to an existing ToDoList by updating the 'items' array
  async addItemToList(docId: string, toDoItem: string): Promise<void> {
    return this.firebaseService.addItemToList(this.collectionName,docId, toDoItem)
  }
  addToDoList(toDoList: ToDoList) {
    return this.firebaseService.addDocument(this.collectionName, toDoList);
  }
    // Update existing to-do list
    updateToDoList(id: string, toDoItem: ToDoItem) {
      return this.firebaseService.updateDocument(this.collectionName, id, toDoItem);
    }
  
    // Delete to-do list
    deleteToDoList(id: string) {
      return this.firebaseService.deleteDocument(this.collectionName, id);
    }
  }


